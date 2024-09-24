/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export interface DeviceInfo {
  ipAddress: string;
  httpAcceptContent: string;
  httpBrowserLanguage: string;
  httpBrowserJavaEnabled: string;
  httpBrowserJavaScriptEnabled: string;
  httpBrowserColorDepth: string;
  httpBrowserScreenHeight: string;
  httpBrowserScreenWidth: string;
  httpBrowserTimeDifference: string;
  userAgentBrowserValue: string;
}

@Injectable()
export class DeviceInfoMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // TODO: Get values from user for the rest of the fields instead of hard coded values.
    const ipAddress =
      (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;
    const httpAcceptContent = req.headers['accept'] as string || '';
    const httpBrowserLanguage = req.headers['accept-language'] as string || 'en_us';
    const httpBrowserJavaEnabled = 'N';
    const httpBrowserJavaScriptEnabled = 'Y';
    const httpBrowserColorDepth = '24';
    const httpBrowserScreenHeight = '100000';
    const httpBrowserScreenWidth = '100000';
    const httpBrowserTimeDifference = '300';
    const userAgentBrowserValue = req.headers['user-agent'] as string || '';

    // Attach device information to the request object
    (req as any).deviceInfo = {
      ipAddress,
      httpAcceptContent,
      httpBrowserLanguage,
      httpBrowserJavaEnabled,
      httpBrowserJavaScriptEnabled,
      httpBrowserColorDepth,
      httpBrowserScreenHeight,
      httpBrowserScreenWidth,
      httpBrowserTimeDifference,
      userAgentBrowserValue,
    };

    next();
  }
}
