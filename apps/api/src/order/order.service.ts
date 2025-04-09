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
    // No logic to place order into database yet. It is just for demonstrating a logic
    // to prevent ordering a "Red set" product more than once in an hour by locking it in Redis.

    // Hard code "Red set" product id and its limit setting here for now.
    // In real world, we should get it as setting from database.
    const RED_SET_PRODUCT_ID = '67f0f3549aa2cccf1c80ebf1';
    const LIMIT = 1;

    // If the order contains a "Red set" product, we need to check if it is already ordered in the last hour.
    if (order.items.find((item) => item.product.id === RED_SET_PRODUCT_ID)) {
      const key = `order:${RED_SET_PRODUCT_ID}`;
      const count = await this.redis.incr(key);
      if (count === 1) {
        await this.redis.expire(key, 60 * 60); // 1 hour TTL
      }

      // If there has been a "Red set" product ordered in the last hour, throw an error.
      if (count > LIMIT) {
        throw new ProductNotAvailableError(
          'Red set product is currently out of stock. Please try again later.',
        );
      }
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
