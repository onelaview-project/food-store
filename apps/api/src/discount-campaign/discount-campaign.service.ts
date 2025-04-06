import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiscountCampaign } from './discount-campaign.schema';

@Injectable()
export class DiscountCampaignService {
  constructor(
    @InjectModel(DiscountCampaign.name)
    private discountCampaignModel: Model<DiscountCampaign>,
  ) {}

  findAll(): Promise<DiscountCampaign[]> {
    return this.discountCampaignModel.find().exec();
  }
}
