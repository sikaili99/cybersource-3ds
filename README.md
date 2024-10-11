<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# 3D Secure Authentication App

This application provides a NestJS-based API for initiating 3D Secure authentication for online payments. It includes a payer authentication enrollment service and a controller to handle authentication requests.

## Features

- Payer Authentication Enrollment
- 3D Secure Authentication Flow
- Device Information Collection
- Integration with CyberSource REST API

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Yarn package manager
- CyberSource account and API credentials

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/sikaili99/cybersource-3ds.git cybersource-3ds-app
   ```

2. Install dependencies:
   ```
   cd cybersource-3ds-app
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   CYBERSOURCE_API_HOST=your_cybersource_api_host
   CYBERSOURCE_MERCHANT_ID=your_merchant_id
   CYBERSOURCE_API_KEY_ID=your_api_key_id
   CYBERSOURCE_SECRET_KEY=your_secret_key
   ```

### Running the App

To start the application in development mode:

```
yarn run start:dev
```

The API will be available at `http://localhost:3000` by default.

## API Usage

### Enrollment Request

**Endpoint:** POST `/payments/authenticate`

**Payload Example:**

```json
{
  "orderInformation": {
    "amountDetails": {
      "currency": "USD",
      "totalAmount": "10.99"
    },
    "billTo": {
      "address1": "1 Market St",
      "address2": "Address 2",
      "administrativeArea": "CA",
      "country": "US",
      "locality": "san francisco",
      "firstName": "John",
      "lastName": "Doe",
      "phoneNumber": "4158880000",
      "email": "test@cybs.com",
      "postalCode": "94105"
    }
  },
  "paymentInformation": {
    "card": {
      "type": "001",
      "expirationMonth": "12",
      "expirationYear": "2025",
      "number": "4456530000001096"
    }
  }
}
```

### Enrollment Response

**Response Example:**

```json
{
    "id": "7286354492906348904953",
    "submitTimeUtc": "2024-10-11T08:30:49Z",
    "status": "PENDING_AUTHENTICATION",
    "clientReferenceInformation": {
        "code": "aJcYbRCM03wXGwTnxqyWa5qm9WcqraCttRNeKWWOKUI422Lz0b",
        "partner": {
            "developerId": "N2RC3Q4K"
        }
    },
    "consumerAuthenticationInformation": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "acsTransactionId": "203781e0-5308-4b72-9ed8-612616beb9c6",
        "acsUrl": "https://0merchantacsstag.cardinalcommerce.com/MerchantACSWeb/creq.jsp",
        "authenticationTransactionId": "BWWb4CNopyeseF4K7Gk0",
        "challengeRequired": "N",
        "pareq": "eyJtZXNzYWdlVHlwZSI6IkNSZXEiLCJtZXNzYWdlVmVyc2lvbi...",
        "specificationVersion": "2.2.0",
        "stepUpUrl": "https://centinelapistag.cardinalcommerce.com/V2/Cruise/StepUp",
        "threeDSServerTransactionId": "86627146-f0e6-4b26-bb61-87eac3900d77",
        "veresEnrolled": "Y",
        "directoryServerTransactionId": "cfdb4f5d-311a-463e-af46-46ac80161097",
        "acsOperatorID": "MerchantACS",
        "acsReferenceNumber": "Cardinal ACS"
    },
    "errorInformation": {
        "reason": "CONSUMER_AUTHENTICATION_REQUIRED",
        "message": "The cardholder is enrolled in Payer Authentication. Please authenticate the cardholder before continuing with the transaction."
    }
}
```

## 3D Secure Authentication Flow

Use an iframe to post accessToken and MD (merchant data) to the setUpUrl

iframe example

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Step-Up Authentication</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        #step-up-iframe {
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <!-- Step-Up Iframe -->
    <iframe name="step-up-iframe" id="step-up-iframe" height="400" width="400">
        <p>Your browser does not support iframes.</p>
    </iframe>

    <!-- Form for Step-Up Authentication -->
    <form id="step-up-form" target="step-up-iframe" method="POST" action="https://centinelapistag.cardinalcommerce.com/V2/Cruise/StepUp">
        <input type="hidden" name="JWT" value="eyJhbGc....">
        <input type="hidden" name="MD" value="aJcYbRCM03wXGwTnxqyWa5qm9WcqraCttRNeKWWOKUI422Lz0b">
    </form>

    <script>
        window.onload = function() {
            var stepUpForm = document.getElementById('step-up-form');
            var iframe = document.getElementById('step-up-iframe');

            if (stepUpForm && iframe) {
                // Automatically submit the form
                stepUpForm.submit();
            }
        }
    </script>
</body>
</html>
```

Once user authenticates 3DS, Cybersource will send the following data to the returnUrl `consumerAuthenticationInformation.returnUrl`

### Cybersource returnUrl payload

```json
{
  TransactionId: 'BWWb4CNopyeseF4K7Gk0',
  MD: 'aJcYbRCM03wXGwTnxqyWa5qm9WcqraCttRNeKWWOKUI422Lz0b'
}
```

This can be used to validate if the user authoursed a payament via 3DS 

## Validate transaction on Cybersource

```js

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

```

Response is send back to the iframe

## TODO:

Handle the response send back to iframe

#### Response example

```json
{
  "success": true,
  "message": "Authentication validated successfully",
  "data": {
    "clientReferenceInformation": {
      "code": "aJcYbRCM03wXGwTnxqyWa5qm9WcqraCttRNeKWWOKUI422Lz0b"
    },
    "consumerAuthenticationInformation": {
      "indicator": "vbv",
      "eciRaw": "05",
      "authenticationResult": "0",
      "strongAuthentication": {
        "OutageExemptionIndicator": "0"
      },
      "authenticationStatusMsg": "Success",
      "eci": "05",
      "token": "AxijLwSTiv5+BGwbU2dXAFRPfiqN4cgCF7DJpJl6MXNaCAAA8Az4",
      "cavv": "AAIBBYNoEwAAACcKhAJkdQAAAAA=",
      "paresStatus": "Y",
      "xid": "AAIBBYNoEwAAACcKhAJkdQAAAAA=",
      "directoryServerTransactionId": "cfdb4f5d-311a-463e-af46-46ac80161097",
      "threeDSServerTransactionId": "86627146-f0e6-4b26-bb61-87eac3900d77",
      "specificationVersion": "2.2.0",
      "acsTransactionId": "203781e0-5308-4b72-9ed8-612616beb9c6"
    },
    "id": "7286355264636624004951",
    "paymentInformation": {
      "card": {
        "bin": "445653",
        "type": "VISA"
      }
    },
    "status": "AUTHENTICATION_SUCCESSFUL",
    "submitTimeUtc": "2024-10-11T08:32:06Z"
  }
}
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.