//
//  CoreViewManager.swift
//  RNCoreMLApp
//
//  Created by Syed Shah on 7/21/21.
//

import Foundation

@available(iOS 11.0, *)
@objc(CoreViewManager)
class CoreViewManager: RCTViewManager {
  override func view() -> UIView! {
    return CoreView()
  }
  
  @objc func obtainLabelData(_ node: NSNumber, imageLocation: NSString!) {
      
      DispatchQueue.main.async {
        let component = self.bridge.uiManager.view(
          forReactTag: node
        ) as! CoreView
        component.update(value: imageLocation)
      }
    }
}
