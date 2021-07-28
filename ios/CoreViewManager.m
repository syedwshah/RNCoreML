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
RCT_EXPORT_VIEW_PROPERTY(onUpdate, RCTDirectEventBlock)

RCT_EXTERN_METHOD(
  obtainLabelData:(nonnull NSNumber *)node
  imageLocation:(nonnull NSString *)imageLocation
)

@end
