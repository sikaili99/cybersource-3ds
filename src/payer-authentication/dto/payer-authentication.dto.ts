import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// Request DTOs

export class AmountDetails {
  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  totalAmount: string;
}

export class BillTo {
  @IsString()
  @IsNotEmpty()
  address1: string;

  @IsString()
  @IsOptional()
  address2?: string;

  @IsString()
  @IsNotEmpty()
  administrativeArea: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  locality: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;
}

export class OrderInformation {
  @ValidateNested()
  @Type(() => AmountDetails)
  amountDetails: AmountDetails;

  @ValidateNested()
  @Type(() => BillTo)
  billTo: BillTo;
}

export class Card {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  expirationMonth: string;

  @IsString()
  @IsNotEmpty()
  expirationYear: string;

  @IsString()
  @IsNotEmpty()
  number: string;
}

export class PaymentInformation {
  @ValidateNested()
  @Type(() => Card)
  card: Card;
}

export class DeviceInformation {
  @IsString()
  @IsOptional()
  ipAddress?: string;

  @IsString()
  @IsOptional()
  httpAcceptContent?: string;

  @IsString()
  @IsOptional()
  httpBrowserLanguage?: string;

  @IsString()
  @IsOptional()
  httpBrowserJavaEnabled?: string;

  @IsString()
  @IsOptional()
  httpBrowserJavaScriptEnabled?: string;

  @IsString()
  @IsOptional()
  httpBrowserColorDepth?: string;

  @IsNumber()
  @IsOptional()
  httpBrowserScreenHeight?: number;

  @IsNumber()
  @IsOptional()
  httpBrowserScreenWidth?: number;

  @IsNumber()
  @IsOptional()
  httpBrowserTimeDifference?: number;

  @IsString()
  @IsOptional()
  userAgentBrowserValue?: string;
}

export class EnrollmentRequestDto {
  @ValidateNested()
  @Type(() => OrderInformation)
  orderInformation: OrderInformation;

  @ValidateNested()
  @Type(() => PaymentInformation)
  paymentInformation: PaymentInformation;

  @ValidateNested()
  @Type(() => DeviceInformation)
  deviceInformation: DeviceInformation;
}

// Response DTOs

export class ClientReferenceInformation {
  @IsString()
  code: string;

  @IsOptional()
  @ValidateNested()
  partner?: {
    developerId: string;
  };
}

export class ConsumerAuthenticationInformation {
  @IsString()
  acsTransactionId: string;

  @IsString()
  acsUrl: string;

  @IsString()
  authenticationTransactionId: string;

  @IsString()
  challengeRequired: string;

  @IsString()
  pareq: string;

  @IsString()
  specificationVersion: string;

  @IsString()
  stepUpUrl: string;

  @IsString()
  threeDSServerTransactionId: string;

  @IsString()
  veresEnrolled: string;

  @IsString()
  directoryServerTransactionId: string;

  @IsString()
  acsOperatorID: string;

  @IsString()
  acsReferenceNumber: string;
}

export class ErrorInformation {
  @IsString()
  reason: string;

  @IsString()
  message: string;
}

export class EnrollmentResponseDto {
  @IsString()
  id: string;

  @IsString()
  submitTimeUtc: string;

  @IsString()
  status: string;

  @ValidateNested()
  @Type(() => ClientReferenceInformation)
  clientReferenceInformation: ClientReferenceInformation;

  @ValidateNested()
  @Type(() => ConsumerAuthenticationInformation)
  consumerAuthenticationInformation: ConsumerAuthenticationInformation;

  @ValidateNested()
  @Type(() => ErrorInformation)
  errorInformation: ErrorInformation;
}
