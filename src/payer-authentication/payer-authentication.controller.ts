import { Controller, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { PayerAuthEnrollmentService } from './payer-authentication.service';
import { DeviceInfo } from '../middleware/device-info.middleware';

interface RequestWithSession extends Request {
  deviceInfo?: DeviceInfo;
}

@Controller('payments')
export class PayerAuthEnrollmentController {
  constructor(private readonly enrollmentService: PayerAuthEnrollmentService) {}

  @Post('enroll')
  async enroll(@Body() body: any, @Req() req: RequestWithSession) {
    const deviceInformation = {
      ipAddress: req.deviceInfo?.ipAddress,
      httpAcceptContent: req.deviceInfo.httpAcceptContent,
      httpBrowserLanguage: req.deviceInfo.httpBrowserLanguage,
      httpBrowserJavaEnabled: req.deviceInfo.httpBrowserJavaEnabled,
      httpBrowserJavaScriptEnabled: req.deviceInfo.httpBrowserJavaScriptEnabled,
      httpBrowserColorDepth: req.deviceInfo.httpBrowserColorDepth,
      httpBrowserScreenHeight: req.deviceInfo.httpBrowserScreenHeight,
      httpBrowserScreenWidth: req.deviceInfo.httpBrowserScreenWidth,
      httpBrowserTimeDifference: req.deviceInfo.httpBrowserTimeDifference,
      userAgentBrowserValue: req.deviceInfo.userAgentBrowserValue,
    };
    const enrollmentRequest = {
      ...body,
      deviceInformation,
    };
    return this.enrollmentService.enrollWithPendingAuthentication(
      enrollmentRequest,
    );
  }
}
