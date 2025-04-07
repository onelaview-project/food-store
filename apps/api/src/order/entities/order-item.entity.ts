import { ProductEntity } from 'product/product.entity';

export interface OrderItemEntity {
  product: ProductEntity;
  quantity: number;
}
