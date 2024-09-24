/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as cybersourceRestApi from 'cybersource-rest-client';

@Injectable()
export class PayerAuthEnrollmentService {
  private readonly configObject: any;
  private readonly apiClient: cybersourceRestApi.ApiClient;

  constructor() {
    this.configObject = this.getConfiguration();
    this.apiClient = new cybersourceRestApi.ApiClient();
  }

  private getConfiguration() {
    return {
      authenticationType: 'http_signature',
      runEnvironment: process.env.CYBERSOURCE_API_HOST,
      merchantID: process.env.CYBERSOURCE_MERCHANT_ID,
      merchantKeyId: process.env.CYBERSOURCE_API_KEY_ID,
      merchantsecretKey: process.env.CYBERSOURCE_SECRET_KEY,
      logConfiguration: {
        enableLog: false,
        loggingLevel: 'debug',
        enableMasking: true,
      },
    };
  }

  async enrollWithPendingAuthentication(requestBody: any): Promise<any> {
    try {
      const requestObj = new cybersourceRestApi.CheckPayerAuthEnrollmentRequest();

      // Map client reference information
      const clientReferenceInformation = new cybersourceRestApi.Riskv1authenticationsetupsClientReferenceInformation();
      clientReferenceInformation.code = requestBody.clientReferenceInformation?.code;
      requestObj.clientReferenceInformation = clientReferenceInformation;

      // Map order information
      const orderInformation = new cybersourceRestApi.Riskv1authenticationsOrderInformation();
      const orderInformationAmountDetails = new cybersourceRestApi.Riskv1authenticationsOrderInformationAmountDetails();
      orderInformationAmountDetails.currency = requestBody.orderInformation.amountDetails.currency;
      orderInformationAmountDetails.totalAmount = requestBody.orderInformation.amountDetails.totalAmount;
      orderInformation.amountDetails = orderInformationAmountDetails;

      const orderInformationBillTo = new cybersourceRestApi.Riskv1authenticationsOrderInformationBillTo();
      orderInformationBillTo.address1 = requestBody.orderInformation.billTo.address1;
      orderInformationBillTo.address2 = requestBody.orderInformation.billTo.address2;
      orderInformationBillTo.administrativeArea = requestBody.orderInformation.billTo.administrativeArea;
      orderInformationBillTo.country = requestBody.orderInformation.billTo.country;
      orderInformationBillTo.locality = requestBody.orderInformation.billTo.locality;
      orderInformationBillTo.firstName = requestBody.orderInformation.billTo.firstName;
      orderInformationBillTo.lastName = requestBody.orderInformation.billTo.lastName;
      orderInformationBillTo.phoneNumber = requestBody.orderInformation.billTo.phoneNumber;
      orderInformationBillTo.email = requestBody.orderInformation.billTo.email;
      orderInformationBillTo.postalCode = requestBody.orderInformation.billTo.postalCode;
      orderInformation.billTo = orderInformationBillTo;

      requestObj.orderInformation = orderInformation;

      // Map payment information
      const paymentInformation = new cybersourceRestApi.Riskv1authenticationsPaymentInformation();
      const paymentInformationCard = new cybersourceRestApi.Riskv1authenticationsetupsPaymentInformationCard();
      paymentInformationCard.type = requestBody.paymentInformation.card.type;
      paymentInformationCard.expirationMonth = requestBody.paymentInformation.card.expirationMonth;
      paymentInformationCard.expirationYear = requestBody.paymentInformation.card.expirationYear;
      paymentInformationCard.number = requestBody.paymentInformation.card.number;
      paymentInformation.card = paymentInformationCard;

      requestObj.paymentInformation = paymentInformation;

      // Map buyer information (optional)
      if (requestBody.buyerInformation) {
        const buyerInformation = new cybersourceRestApi.Riskv1authenticationsBuyerInformation();
        buyerInformation.mobilePhone = requestBody.buyerInformation.mobilePhone;
        requestObj.buyerInformation = buyerInformation;
      }

      // Map consumer authentication information
      const consumerAuthenticationInformation = new cybersourceRestApi.Riskv1decisionsConsumerAuthenticationInformation();
      consumerAuthenticationInformation.transactionMode = 'eCommerce';
      consumerAuthenticationInformation.deviceChannel = 'BROWSER';
      requestObj.consumerAuthenticationInformation = consumerAuthenticationInformation;

      // Map device information
      const deviceInformation = new cybersourceRestApi.Riskv1authenticationsDeviceInformation();
      deviceInformation.ipAddress = requestBody.deviceInformation.ipAddress;
      deviceInformation.httpAcceptContent = requestBody.deviceInformation.httpAcceptContent;
      deviceInformation.httpBrowserLanguage = requestBody.deviceInformation.httpBrowserLanguage;
      deviceInformation.httpBrowserJavaEnabled = requestBody.deviceInformation.httpBrowserJavaEnabled;
      deviceInformation.httpBrowserJavaScriptEnabled = requestBody.deviceInformation.httpBrowserJavaScriptEnabled;
      deviceInformation.httpBrowserColorDepth = requestBody.deviceInformation.httpBrowserColorDepth;
      deviceInformation.httpBrowserScreenHeight = requestBody.deviceInformation.httpBrowserScreenHeight;
      deviceInformation.httpBrowserScreenWidth = requestBody.deviceInformation.httpBrowserScreenWidth;
      deviceInformation.httpBrowserTimeDifference = requestBody.deviceInformation.httpBrowserTimeDifference;
      deviceInformation.userAgentBrowserValue = requestBody.deviceInformation.userAgentBrowserValue;

      requestObj.deviceInformation = deviceInformation;

      const instance = new cybersourceRestApi.PayerAuthenticationApi(this.configObject, this.apiClient);

      return new Promise((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        instance.checkPayerAuthEnrollment(requestObj, (error: any, data: any, response: any) => {
          if (error) {
            console.error('Error:', error);
            reject(error);
          } else {
            console.log('Data:', data);
            resolve(data);
          }
        });
      });
    } catch (error) {
      console.error('Exception:', error);
      throw error;
    }
  }
}