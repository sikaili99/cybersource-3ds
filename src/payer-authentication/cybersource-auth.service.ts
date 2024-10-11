/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';
import { ValidateAuthenticationDto } from './dto/validate-authentication.dto';
import 'dotenv/config';

@Injectable()
export class CybersourceAuthService {
  private readonly apiHost: string;
  private readonly merchantId: string;
  private readonly apiKeyId: string;
  private readonly secretKey: string;

  constructor() {
    this.apiHost = process.env.CYBERSOURCE_API_HOST || 'apitest.cybersource.com';
    this.merchantId = process.env.CYBERSOURCE_MERCHANT_ID;
    this.apiKeyId = process.env.CYBERSOURCE_API_KEY_ID;
    this.secretKey = process.env.CYBERSOURCE_SECRET_KEY;
  }

  async validateAuthentication(dto: ValidateAuthenticationDto): Promise<any> {
    const { TransactionId, MD } = dto;
    console.log({ TransactionId, MD });
    
    const endpoint = '/risk/v1/authentication-results';
    const url = `https://${this.apiHost}${endpoint}`;
    const payload = {
      clientReferenceInformation: {
        code: MD
      },
      consumerAuthenticationInformation: {
        authenticationTransactionId: TransactionId
      }
    };

    const gmtDateTime = new Date().toUTCString();
    const digestHash = this.getDigest(JSON.stringify(payload));
    const signature = this.generateSignature('post', endpoint, digestHash, gmtDateTime);

    try {
      const response = await axios.post(url, payload, {
        headers: {
          'v-c-merchant-id': this.merchantId,
          'Date': gmtDateTime,
          'Host': this.apiHost,
          'Digest': digestHash,
          'Signature': signature,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status === 'AUTHENTICATION_SUCCESSFUL') {
        return { success: true, message: 'Authentication validated successfully', data: response.data };
      } else {
        return { success: false, message: 'Authentication validation failed', data: response.data };
      }
    } catch (error) {
      console.error('Error during authentication validation:', error.response?.data || error);
      return { success: false, message: 'An error occurred during validation', error: error.response?.data || error.message };
    }
  }

  private getDigest(payload: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(payload);
    return `SHA-256=${hash.digest('base64')}`;
  }

  private generateSignature(httpMethod: string, requestUri: string, digestHash: string, gmtDateTime: string): string {
    const signatureParams = [
      `host: ${this.apiHost}`,
      `date: ${gmtDateTime}`,
      `(request-target): ${httpMethod.toLowerCase()} ${requestUri}`,
      `digest: ${digestHash}`,
      `v-c-merchant-id: ${this.merchantId}`
    ].join('\n');

    const decodedSecret = Buffer.from(this.secretKey, 'base64');
    const hmac = crypto.createHmac('sha256', decodedSecret);
    const signatureString = hmac.update(signatureParams).digest('base64');

    return `keyid="${this.apiKeyId}", algorithm="HmacSHA256", headers="host date (request-target) digest v-c-merchant-id", signature="${signatureString}"`;
  }
}
