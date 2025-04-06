import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({
    type: [{ type: String, ref: 'DiscountCampaign' }],
  })
  discountCampaigns: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.set('toObject', {
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = doc._id.toString();
    delete ret._id;
    return ret;
  },
});
