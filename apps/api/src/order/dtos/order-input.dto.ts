import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { OrderItemInputDto } from './order-item-input.dto';

export class OrderInputDto {
  @IsOptional()
  @IsString()
  memberCardNumber: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemInputDto)
  items: OrderItemInputDto[];
}
