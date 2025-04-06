import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountCampaignModule } from './discount-campaign/discount-campaign.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
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
