import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.productModel.find().exec();
    return products.map((product) => product.toObject<ProductEntity>());
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      return null;
    }
    return product.toObject<ProductEntity>();
  }
}
