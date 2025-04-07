import { OrderItemEntity } from './order-item.entity';

export interface OrderEntity {
  memberCardNumber: string | null;
  items: OrderItemEntity[];
}
