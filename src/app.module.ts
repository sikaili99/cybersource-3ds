import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayerAuthenticationModule } from './payer-authentication/payer-authentication.module';
import { DeviceInfoMiddleware } from './middleware/device-info.middleware';

@Module({
  imports: [PayerAuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DeviceInfoMiddleware).forRoutes('payments'); // Apply to the '/enroll' route
  }
}
