import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProductModule } from 'product/product.module';
import { DiscountModule } from 'discount/discount.module';
import { RedisProvider } from './redis/redis.provider';

@Module({
  imports: [ProductModule, DiscountModule],
  controllers: [OrderController],
  providers: [RedisProvider, OrderService],
})
export class OrderModule {}
