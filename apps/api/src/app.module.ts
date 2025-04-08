import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DiscountCampaignModule } from './discount-campaign/discount-campaign.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
      serveRoot: '/assets/',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGODB_URI'),
        user: config.get('MONGODB_USERNAME'),
        pass: config.get('MONGODB_PASSWORD'),
        dbName: config.get('MONGODB_DB_NAME'),
      }),
      inject: [ConfigService],
    }),
    DiscountCampaignModule,
    ProductModule,
    OrderModule,
  ],
})
export class AppModule {}
