import { INestApplicationContext } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiscountCampaign } from '../discount-campaign/discount-campaign.schema';

const DISCOUNT_CAMPAIGNS = [
  {
    _id: 'PairWithSameProductDiscount5Percent',
    percent: 5,
  },
];

export default async function seedDiscountCampaigns(
  app: INestApplicationContext,
) {
  const discountCampaignModel = app.get<Model<DiscountCampaign>>(
    getModelToken(DiscountCampaign.name),
  );

  const bulkWriteOps = DISCOUNT_CAMPAIGNS.map((discountCampaign) => ({
    updateOne: {
      filter: { _id: discountCampaign._id },
      update: { $set: discountCampaign },
      upsert: true,
    },
  }));

  await discountCampaignModel.bulkWrite(bulkWriteOps);
  console.log('DiscountCampaigns seeded successfully');
}
