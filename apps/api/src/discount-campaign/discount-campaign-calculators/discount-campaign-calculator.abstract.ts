import { OrderItemEntity } from 'order/entities/order-item.entity';

// An abstract class that defines the contract for discount campaign calculators.
export abstract class DiscountCampaignCalculatorAbstract {
  abstract calculateDiscount(
    discountOrderItem: OrderItemEntity, // The order item that has a discount campaign
    allOrderItems: OrderItemEntity[], // All order items in the order
  ): number;
}
