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
}
