/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"v8"] forKey:@"ti.android.runtime"];
    [_property setObject:[TiUtils stringValue:@"3tk98HImEJYNRJi7y2600fv020xzJyBe"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"Agw928JB5rFSyaadGjwdHTO1bn1KUV4q"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"5ZsxVzKWUj3eNxgkdXAFWoGbF7jPiz43"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"mX93aIafkG8fcX2Wxis7QKl3oqtIf16x"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"MOK8Px3S08rFAl0N9CfgiaDi8IYY4QFg"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"1uzqw9Eq4ffGfQSyg38k9WxIhjTHFgLR"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
