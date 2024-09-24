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
      "number": "4000000000002503"
    }
  }
}
```

### Enrollment Response

**Response Example:**

```json
{
    "id": "7271651195656439704953",
    "submitTimeUtc": "2024-09-24T08:05:19Z",
    "status": "PENDING_AUTHENTICATION",
    "clientReferenceInformation": {
        "code": "1727165119636",
        "partner": {
            "developerId": "N2RC3Q4K"
        }
    },
    "consumerAuthenticationInformation": {
        "acsTransactionId": "ac7b8126-5866-4901-b24e-7de373123bc1",
        "acsUrl": "https://0merchantacsstag.cardinalcommerce.com/MerchantACSWeb/creq.jsp",
        "authenticationTransactionId": "zwGPO1zc3LjZKRLg0wh0",
        "challengeRequired": "N",
        "pareq": "eyJtZXNzYWdlVHlwZSI6IkNSZXEiLCJtZXNzY....",
        "specificationVersion": "2.2.0",
        "stepUpUrl": "https://centinelapistag.cardinalcommerce.com/V2/Cruise/StepUp",
        "threeDSServerTransactionId": "923da988-4127-46f5-adb6-9a1e3d53050c",
        "veresEnrolled": "Y",
        "directoryServerTransactionId": "c0ce63fa-acc0-4c8f-806c-f582b4fa5c89",
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

1. Send a POST request to `/payments/authenticate` with the payment details.
2. Receive the enrollment response, which includes the `acsUrl` and `pareq`.
3. Redirect the user to the 3D Secure authentication page using the provided HTML form.
4. Handle the post-authentication response at your specified `termUrl`.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.