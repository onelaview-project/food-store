import { DiscountItemOutputDto } from 'order/dtos/discount-item-output.dto';

export interface CalculateOrderPriceOutputDto {
  totalPriceBeforeDiscount: number;
  discountFromMemberCard: number;
  discountItems: DiscountItemOutputDto[];
}
