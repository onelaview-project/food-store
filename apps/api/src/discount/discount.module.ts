import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountCampaignModule } from 'discount-campaign/discount-campaign.module';

@Module({
  imports: [DiscountCampaignModule],
  providers: [DiscountService],
  exports: [DiscountService],
})
export class DiscountModule {}
