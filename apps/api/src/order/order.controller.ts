import { Body, Controller, Post } from '@nestjs/common';
import { CalculateOrderPriceOutput, OrderService } from './order.service';
import { CalculatePriceDto } from './dtos/calculate-price.dto';
import { ProductService } from 'product/product.service';

@Controller('/orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
  ) {}

  @Post('/calculate-price')
  async calculatePrice(
    @Body() calculatePriceDto: CalculatePriceDto,
  ): Promise<CalculateOrderPriceOutput> {
    const orderItems = await Promise.all(
      calculatePriceDto.items.map(async (item) => {
        const product = await this.productService.findById(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }

        return {
          product,
          quantity: item.quantity,
        };
      }),
    );

    return this.orderService.calculateOrderPrice({
      memberCardNumber: calculatePriceDto.memberCardNumber,
      items: orderItems,
    });
  }
}
