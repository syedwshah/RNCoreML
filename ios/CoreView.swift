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
      button.setTitle(String(describing: image), for: .normal)
    }
  }
  
  @objc var count: NSNumber = 0 {
    didSet {
      button.setTitle(String(describing: count), for: .normal)
    }
  }
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.addSubview(button)
    increment()
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
      action: #selector(increment),
      for: .touchUpInside
    )
    
    let longPress = UILongPressGestureRecognizer(
          target: self,
          action: #selector(sendUpdate(_:))
        )
        b.addGestureRecognizer(longPress)
    
    return b
  }()
  
  @objc func sendUpdate(_ gesture: UILongPressGestureRecognizer) {
      if gesture.state == .began {
        if onUpdate != nil {
          onUpdate!(["count": count])
        }
      }
    }
  
  @objc func increment() {
    count = count.intValue + 1 as NSNumber
  }
}
