//
//  CoreViewManager.m
//  RNCoreMLApp
//
//  Created by Syed Shah on 7/21/21.
//

#import <Foundation/Foundation.h>

#import "React/RCTViewManager.h"
@interface RCT_EXTERN_MODULE(CoreViewManager, RCTViewManager)

//Allow React to send data as props
RCT_EXPORT_VIEW_PROPERTY(count, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(image, NSString)
RCT_EXPORT_VIEW_PROPERTY(onUpdate, RCTDirectEventBlock)
//Might need this:
//RCT_EXTERN_METHOD(classification: (RCTResponseSenderBlock)callback)

@end
