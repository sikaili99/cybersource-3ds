import { Controller, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { PayerAuthEnrollmentService } from './payer-authentication.service';
import { DeviceInfo } from '../middleware/device-info.middleware';
import {
  EnrollmentRequestDto,
  EnrollmentResponseDto,
} from './dto/payer-authentication.dto';
import { ValidateAuthenticationDto } from './dto/validate-authentication.dto';
import { CybersourceAuthService } from './cybersource-auth.service';

interface RequestWithSession extends Request {
  deviceInfo?: DeviceInfo;
}

@Controller('payments')
export class PayerAuthEnrollmentController {
  constructor(
    private readonly enrollmentService: PayerAuthEnrollmentService,
    private readonly cybersourceAuthService: CybersourceAuthService,
  ) {}

  @Post('authenticate')
  async enroll(
    @Body() body: EnrollmentRequestDto,
    @Req() req: RequestWithSession,
  ): Promise<EnrollmentResponseDto> {
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

  @Post('/receipt')
  async validateAuthentication(@Body() dto: ValidateAuthenticationDto) {
    console.log(dto);
    return this.cybersourceAuthService.validateAuthentication(dto);
  }
}
