//
//  CoreViewManager.swift
//  RNCoreMLApp
//
//  Created by Syed Shah on 7/21/21.
//

import Foundation

@objc(CoreViewManager)
class CoreViewManager: RCTViewManager {
  override func view() -> UIView! {
    return CoreView()
  }
}
