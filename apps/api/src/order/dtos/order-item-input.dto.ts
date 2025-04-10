import { IsString, IsInt, Min, Max } from 'class-validator';

export class OrderItemInputDto {
  @IsString()
  productId: string;

  @IsInt()
  @Min(1)
  @Max(99)
  quantity: number;
}
