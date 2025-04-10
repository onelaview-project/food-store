import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { DiscountCampaignCalculatorAbstract } from 'discount-campaign/discount-campaign-calculators/discount-campaign-calculator.abstract';
import { OrderItemEntity } from 'order/entities/order-item.entity';

@Injectable()
export class DiscountService {
  constructor(private moduleRef: ModuleRef) {}

  calculateOrderItemDiscount(
    discountOrderItem: OrderItemEntity,
    allOrderItems: OrderItemEntity[],
  ): number {
    // Assume the product's first discount campaign is the one we want to apply
    // In the real world, we might want to check all campaigns and apply the best one
    const discountCampaign = discountOrderItem.product.discountCampaigns[0];

    // Retrieve discount campaign calculator dynamically from DI container
    const calculator = this.moduleRef.get<
      string,
      DiscountCampaignCalculatorAbstract
    >(discountCampaign, { strict: false });

    // Calculate the discount for the order item using the calculator
    return calculator.calculateDiscount(discountOrderItem, allOrderItems);
  }

  calculateMemberCardDiscount(beforeDiscountPrice: number): number {
    // Assume a fixed 10% discount for member card holders
    // In the real world, the discount percentage might be retrieved from a database or configuration
    return beforeDiscountPrice * 0.1;
  }
}
