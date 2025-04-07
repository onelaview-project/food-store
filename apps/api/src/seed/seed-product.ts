import { INestApplicationContext } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Product } from '../product/product.schema';

const PRODUCTS = [
  {
    _id: new mongoose.Types.ObjectId('67f0f3549aa2cccf1c80ebf1'),
    name: 'Red set',
    price: 50,
    imageUrl: 'http://localhost:3000/assets/red-set.jpg',
  },
  {
    _id: new mongoose.Types.ObjectId('67f0f3549aa2cccf1c80ebf2'),
    name: 'Green set',
    price: 40,
    discountCampaigns: ['PairWithSameProductDiscount5Percent'],
    imageUrl: 'http://localhost:3000/assets/green-set.png',
  },
  {
    _id: new mongoose.Types.ObjectId('67f0f3549aa2cccf1c80ebf3'),
    name: 'Blue set',
    price: 30,
    imageUrl: 'http://localhost:3000/assets/blue-set.png',
  },
  {
    _id: new mongoose.Types.ObjectId('67f0f3549aa2cccf1c80ebf4'),
    name: 'Yellow set',
    price: 50,
    imageUrl: 'http://localhost:3000/assets/yellow-set.png',
  },
  {
    _id: new mongoose.Types.ObjectId('67f0f3549aa2cccf1c80ebf5'),
    name: 'Pink set',
    price: 80,
    discountCampaigns: ['PairWithSameProductDiscount5Percent'],
    imageUrl: 'http://localhost:3000/assets/pink-set.png',
  },
  {
    _id: new mongoose.Types.ObjectId('67f0f3549aa2cccf1c80ebf6'),
    name: 'Purple set',
    price: 90,
    imageUrl: 'http://localhost:3000/assets/purple-set.jpg',
  },
  {
    _id: new mongoose.Types.ObjectId('67f0f3549aa2cccf1c80ebf7'),
    name: 'Orange set',
    price: 120,
    discountCampaigns: ['PairWithSameProductDiscount5Percent'],
    imageUrl: 'http://localhost:3000/assets/orange-set.jpg',
  },
];

export default async function seedProducts(app: INestApplicationContext) {
  const productModel = app.get<Model<Product>>(getModelToken(Product.name));

  const bulkWriteOps = PRODUCTS.map((product) => ({
    updateOne: {
      filter: { _id: product._id },
      update: { $set: product },
      upsert: true,
    },
  }));

  await productModel.bulkWrite(bulkWriteOps);
  console.log('Products seeded successfully');
}
