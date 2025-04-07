import { Injectable } from '@nestjs/common';
import { DiscountCampaignCalculatorAbstract } from './discount-campaign-calculator.abstract';
import { OrderItemEntity } from 'order/entities/order-item.entity';

// This class calculates the discount for a pair of the same product
// with a discount of N percent.
@Injectable()
export class PairWithSameProductDiscountNPercentCalculator
  implements DiscountCampaignCalculatorAbstract
{
  constructor(private readonly percent: number) {}

  calculateDiscount(
    discountOrderItem: OrderItemEntity,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    allOrderItems: OrderItemEntity[],
  ): number {
    return (
      Math.floor(discountOrderItem.quantity / 2) *
      2 *
      discountOrderItem.product.price *
      (this.percent / 100)
    );
  }
}
