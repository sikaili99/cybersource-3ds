import { Module } from '@nestjs/common';
import { PayerAuthEnrollmentController } from './payer-authentication.controller';
import { PayerAuthEnrollmentService } from './payer-authentication.service';
import { CybersourceAuthService } from './cybersource-auth.service';

@Module({
  controllers: [PayerAuthEnrollmentController],
  providers: [PayerAuthEnrollmentService, CybersourceAuthService],
})
export class PayerAuthenticationModule {}
