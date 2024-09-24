import { Module } from '@nestjs/common';
import { PayerAuthEnrollmentController } from './payer-authentication.controller';
import { PayerAuthEnrollmentService } from './payer-authentication.service';

@Module({
  controllers: [PayerAuthEnrollmentController],
  providers: [PayerAuthEnrollmentService],
})
export class PayerAuthenticationModule {}
