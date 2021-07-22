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

class CoreView: UIView {
  @objc var image: NSString = "" {
    didSet {
      button.setTitle(String(describing: ""), for: .normal)
    }
  }
  @objc var count: NSNumber = 0

  override init(frame: CGRect) {
    super.init(frame: frame)
    self.addSubview(button)
    //put methods to run here on touch
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
}
