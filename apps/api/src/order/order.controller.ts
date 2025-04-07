import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CalculateOrderPriceOutputDto } from './dtos/calculate-order-price-output.dto';
import { OrderInputDto } from './dtos/order-input.dto';
import { ProductService } from 'product/product.service';
import { OrderEntity } from './entities/order.entity';
import { PlaceOrderOutputDto } from './dtos/place-order-output.dto';
import { ProductNotAvailableError } from './errors/product-not-available-error';

@Controller('/orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
  ) {}

  @Post('/calculate-price')
  @HttpCode(200)
  async calculatePrice(
    @Body() orderDto: OrderInputDto,
  ): Promise<CalculateOrderPriceOutputDto> {
    // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay

    const orderEntity = await this.#mapOrderInputDtoToOrderEntity(orderDto);
    return this.orderService.calculateOrderPrice(orderEntity);
  }

  @Post('/place-order')
  async placeOrder(
    @Body() orderDto: OrderInputDto,
  ): Promise<PlaceOrderOutputDto> {
    // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay

    try {
      const orderEntity = await this.#mapOrderInputDtoToOrderEntity(orderDto);
      await this.orderService.placeOrder(orderEntity);
      return {
        success: true,
        message: 'Order placed successfully',
      };
    } catch (error) {
      if (error instanceof ProductNotAvailableError) {
        return {
          success: false,
          message: error.message,
          errorCode: error.name,
        };
      }
      throw new BadRequestException(`Failed to place order: ${error}`);
    }
  }

  async #mapOrderInputDtoToOrderEntity(
    orderDto: OrderInputDto,
  ): Promise<OrderEntity> {
    const orderItems = await Promise.all(
      orderDto.items.map(async (item) => {
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

    const orderEntity: OrderEntity = {
      memberCardNumber: orderDto.memberCardNumber,
      items: orderItems,
    };

    return orderEntity;
  }
}
