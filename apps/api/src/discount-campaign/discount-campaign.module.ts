import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DiscountCampaign,
  DiscountCampaignSchema,
} from './discount-campaign.schema';
import { DiscountCampaignService } from './discount-campaign.service';
import { PairWithSameProductDiscountNPercentCalculator } from './discount-campaign-calculators/pair-with-same-product-discount-n-percent';
import { PAIR_WITH_SAME_PRODUCT_DISCOUNT_5_PERCENT_DISCOUNT_CAMPAIGN_CALCULATOR } from './discount-campaign-calculators/constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DiscountCampaign.name,
        schema: DiscountCampaignSchema,
      },
    ]),
  ],
  providers: [
    DiscountCampaignService,
    {
      provide:
        PAIR_WITH_SAME_PRODUCT_DISCOUNT_5_PERCENT_DISCOUNT_CAMPAIGN_CALCULATOR,
      useValue: new PairWithSameProductDiscountNPercentCalculator(5),
    },
  ],
  exports: [
    PAIR_WITH_SAME_PRODUCT_DISCOUNT_5_PERCENT_DISCOUNT_CAMPAIGN_CALCULATOR,
  ],
})
export class DiscountCampaignModule {}
