import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { OrderItemInputDto } from './order-item-input.dto';

export class OrderInputDto {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  memberCardNumber: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemInputDto)
  items: OrderItemInputDto[];
}
