import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountCampaignModule } from './discount-campaign/discount-campaign.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
      serveRoot: '/assets/',
    }),
    // TODO: Use environment variables for MongoDB connection
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      user: 'root',
      pass: 'example',
      dbName: 'food-store',
    }),
    DiscountCampaignModule,
    ProductModule,
    OrderModule,
  ],
})
export class AppModule {}
