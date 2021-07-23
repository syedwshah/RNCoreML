//
//  CoreView.swift
//  RNCoreMLApp
//
//  Created by Syed Shah on 7/21/21.
//

import Foundation
import UIKit
import CoreML
import Vision

@available(iOS 11.0, *)
class CoreView: UIView {
  @objc var image: NSString = "" {
    didSet {
      button.setTitle(String(describing: ""), for: .normal)
    }
  }
  @objc var count: NSNumber = 0
  @objc var label: NSString = ""

  override init(frame: CGRect) {
    super.init(frame: frame)
    self.addSubview(button)
  
    sendUpdate()
  }
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  @objc var onUpdate: RCTDirectEventBlock?
  
  lazy var button: UIButton = {
    let b = UIButton.init(type: UIButton.ButtonType.system)
    b.titleLabel?.font = UIFont.systemFont(ofSize: 50)
    b.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    b.addTarget(
      self,
      action: #selector(sendUpdate),
//      action: #selector(sendClassification(image)),
      for: .touchUpInside
    )
    
    return b
  }()
  
  @objc func sendUpdate() {
    if onUpdate != nil {
      onUpdate!(["count": count])
    }
    print("Count is \(count)")
  }
  
  private lazy var classificationRequest: VNCoreMLRequest = {
    do {
      let model = try VNCoreMLModel(for: MobileNet().model)
      
      let request = VNCoreMLRequest(model: model) { request, _ in
          if let classifications =
            request.results as? [VNClassificationObservation] {
            //classifications are here, so send them to react
            print("Classification results: \(classifications)")
          }
      }
      
      request.imageCropAndScaleOption = .centerCrop
      return request
    } catch {
      
      fatalError("Failed to load Vision ML model: \(error)")
    }
  }()
  
  func classifyImage(_ imageString: NSString) {
    let imageData = Data(base64Encoded: imageString as String)
    let image = UIImage(data: imageData!)
    
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
