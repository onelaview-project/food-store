import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DiscountCampaignDocument = HydratedDocument<DiscountCampaign>;

@Schema()
export class DiscountCampaign {
  @Prop({ type: String })
  _id: string;

  @Prop()
  percent: number;
}

export const DiscountCampaignSchema =
  SchemaFactory.createForClass(DiscountCampaign);
