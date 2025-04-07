import { Inject, Injectable } from '@nestjs/common';
import { OrderItemEntity } from './entities/order-item.entity';
import { DiscountService } from '../discount/discount.service';
import Redis from 'ioredis';
import { OrderEntity } from './entities/order.entity';
import { CalculateOrderPriceOutputDto } from './dtos/calculate-order-price-output.dto';
import { DiscountItemOutputDto } from './dtos/discount-item-output.dto';
import { ProductNotAvailableError } from './errors/product-not-available-error';

@Injectable()
export class OrderService {
  constructor(
    private readonly discountService: DiscountService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {}

  calculateOrderPrice(order: OrderEntity): CalculateOrderPriceOutputDto {
    const totalPriceBeforeDiscount = this.#calculateTotalPriceBeforeDiscount(
      order.items,
    );

    const [discountItems, totalDiscountPrice] =
      this.#calculateDiscountItemsAndTotalDiscountPrice(order.items);

    // TODO: Move this to discount service
    const discountFromMemberCard = order.memberCardNumber
      ? (totalPriceBeforeDiscount - totalDiscountPrice) * 0.1
      : 0;

    return {
      totalPriceBeforeDiscount,
      discountFromMemberCard,
      discountItems,
    };
  }

  async placeOrder(order: OrderEntity) {
    const RED_SET_PRODUCT_ID = '67f0f3549aa2cccf1c80ebf1';
    if (order.items.find((item) => item.product.id === RED_SET_PRODUCT_ID)) {
      if (await this.redis.get('order:red_set')) {
        throw new ProductNotAvailableError(
          'Red set product is currently out of stock',
        );
      }

      await this.redis.set('order:red_set', 1, 'EX', 60 * 60); // 1 hour
    }
  }

  #calculateTotalPriceBeforeDiscount(items: OrderItemEntity[]): number {
    return items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  #calculateDiscountItemsAndTotalDiscountPrice(
    items: OrderItemEntity[],
  ): [DiscountItemOutputDto[], number] {
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
