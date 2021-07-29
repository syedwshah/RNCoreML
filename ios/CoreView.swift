import Foundation
import UIKit
import CoreML
import Vision

@available(iOS 11.0, *)
class CoreView: UIView {
  @objc var label: NSArray = []
  @objc var imageLocation: NSString!
  var toggle = true

  override init(frame: CGRect) {
    super.init(frame: frame)
  }
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  @objc var onUpdate: RCTDirectEventBlock?
  
  //This will receive a value from React, then udpate data on Native
  @objc func update(value: NSString) {
    //    classifyImage(value)
    label = [value]
    print("label is \(label)")
        
    //Temporary solution for potential need to run extra sendUpdate() the first time
    if toggle {
      sendUpdate()
      toggle = false
    }
    
    sendUpdate()
  }
  
  @objc func sendUpdate() {
    if onUpdate != nil {
      onUpdate!(["label": label])
    }
  }
  
  
  private lazy var classificationRequest: VNCoreMLRequest = {
    do {
      let model = try VNCoreMLModel(for: MobileNet().model)

      let request = VNCoreMLRequest(model: model) { request, _ in
          if let classifications =
            request.results as? [VNClassificationObservation] {
          
            print("Classification results: \(classifications)")

            self.label = classifications as NSArray
          }
      }

      request.imageCropAndScaleOption = .centerCrop
      return request
    } catch {
      fatalError("Failed to load Vision ML model: \(error)")
    }
  }()

  @objc func classifyImage(_ image: NSString) {
    //May need a new way to convert NSString to UIImage
    let imageData = Data(base64Encoded: image as String)!
    let image = UIImage(data: imageData)


    guard let orientation = CGImagePropertyOrientation(
            rawValue: UInt32(image!.imageOrientation.rawValue)) else {
      return
    }
    guard let ciImage = CIImage(image: image!) else {
      fatalError("Unable to create \(CIImage.self) from \(String(describing: image)).")
    }

    DispatchQueue.global(qos: .userInitiated).async {
      let handler =
        VNImageRequestHandler(ciImage: ciImage, orientation: orientation)
      do {
        try handler.perform([self.classificationRequest])
      } catch {
        print("Failed to perform classification.\n\(error.localizedDescription)")
      }
    }
  }
}
