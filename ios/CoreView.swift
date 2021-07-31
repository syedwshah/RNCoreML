import Foundation
import UIKit
import CoreML
import Vision

@available(iOS 11.0, *)
class CoreView: UIView {
  @objc var label: NSArray = []
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
    classifyImage(value as String)
    
//    print("label is \(label)")
//
    //Temporary solution for potential need to run extra sendUpdate() the first time
    //Would be better to wait for a promise
//    if toggle {
//      sendUpdate()
//      toggle = false
//    }
//
//    sendUpdate()
  }
  
  @objc func sendUpdate() {
    if toggle {
      onUpdate!(["label": label])
      toggle = false
    }
    
    if onUpdate != nil {
      onUpdate!(["label": label])
    }
  }
  
  
  @objc private lazy var classificationRequest: VNCoreMLRequest = {
    do {
      let model = try VNCoreMLModel(for: MobileNet().model)

      let request = VNCoreMLRequest(model: model) { request, _ in
          if let classifications =
            request.results as? [VNClassificationObservation] {
            
            let topClassifications = classifications.prefix(2).map {
              ["confidence": $0.confidence as NSNumber, "identifier": $0.identifier as NSString]
            }

            self.label = topClassifications as NSArray
            self.sendUpdate()
            print("label is \(self.label)")
        }
      }

      request.imageCropAndScaleOption = .centerCrop

      return request
    } catch {
      fatalError("Failed to load Vision ML model: \(error)")
    }
  }()

  @objc func classifyImage(_ image: String) {
    let uiImage = ConvertBase64StringToImage(imageBase64String: image)

    guard let orientation = CGImagePropertyOrientation(
            rawValue: UInt32((uiImage?.imageOrientation.rawValue)!)) else {
      return
    }
    guard let ciImage = CIImage(image: uiImage!) else {
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
  
  func ConvertBase64StringToImage (imageBase64String:String) -> UIImage? {
      if let url = URL(string: imageBase64String) {
          do {
              let imageData = try Data(contentsOf: url)
              let image = UIImage(data: imageData)
              return image
          } catch {
              print(error)
          }
      }

      return nil
  }
}
