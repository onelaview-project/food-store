import { Injectable } from '@nestjs/common';
import { OrderItemEntity } from './order-item.entity';
import { DiscountService } from '../discount/discount.service';

export interface CalculateOrderPriceInput {
  memberCardNumber: string | null;
  items: OrderItemEntity[];
}

interface DiscountItem {
  productId: string;
  discount: number;
}

export interface CalculateOrderPriceOutput {
  totalPriceBeforeDiscount: number;
  discountFromMemberCard: number;
  discountItems: DiscountItem[];
}

@Injectable()
export class OrderService {
  constructor(private readonly discountService: DiscountService) {}

  calculateOrderPrice(
    input: CalculateOrderPriceInput,
  ): CalculateOrderPriceOutput {
    const totalPriceBeforeDiscount = this.#calculateTotalPriceBeforeDiscount(
      input.items,
    );

    const [discountItems, totalDiscountPrice] =
      this.#calculateDiscountItemsAndTotalDiscountPrice(input.items);

    const discountFromMemberCard = input.memberCardNumber
      ? (totalPriceBeforeDiscount - totalDiscountPrice) * 0.1
      : 0;

    return {
      totalPriceBeforeDiscount,
      discountFromMemberCard,
      discountItems,
    };
  }

  #calculateTotalPriceBeforeDiscount(items: OrderItemEntity[]): number {
    return items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  #calculateDiscountItemsAndTotalDiscountPrice(
    items: OrderItemEntity[],
  ): [DiscountItem[], number] {
    let totalDiscountPrice = 0;

    const discountItems = items
      // Filter only order items that contain a product with discount campaign
      .filter((item) => item.product.discountCampaigns.length > 0)
      // and calculate the discount for each of them
      .map((item) => {
        const discountItem = {
          productId: item.product.id,
          discount: this.discountService.calculateOrderItemDiscount(
            item,
            items,
          ),
        };

        totalDiscountPrice += discountItem.discount;

        return discountItem;
      })
      // filter out items with no discount
      .filter((item) => item.discount > 0);

    return [discountItems, totalDiscountPrice];
  }
}
