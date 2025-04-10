import { Test, TestingModule } from '@nestjs/testing';
import { PairWithSameProductDiscountNPercentCalculator } from './pair-with-same-product-discount-n-percent';
import { OrderItemEntity } from 'order/entities/order-item.entity';

describe('• PairWithSameProductDiscountNPercentCalculator', () => {
  let calculator: PairWithSameProductDiscountNPercentCalculator;

  describe('• pairWithSameProductDiscountNPercentCalculator.calculateDiscount()', () => {
    describe('Given a PairWithSameProductDiscountNPercentCalculator (calculator) that is configured to discount 5%', () => {
      beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
          providers: [
            {
              provide: PairWithSameProductDiscountNPercentCalculator,
              useValue: new PairWithSameProductDiscountNPercentCalculator(5), // Use 5% as example percentage
            },
          ],
        }).compile();

        calculator = app.get(PairWithSameProductDiscountNPercentCalculator);
      });

      describe('And an order item with a product of price 100, and quantity 1', () => {
        const mockOrderItem: OrderItemEntity = {
          product: {
            id: 'dummy-product-id',
            name: 'Dummy Product',
            price: 100,
            discountCampaigns: [],
            imageUrl: 'https://dummyimage.com/100x100/000/fff',
          },
          quantity: 1,
        };

        describe('When call calculator.calculateDiscount() to calculate discount', () => {
          it('Then should return 0 (no discount because the quantity not equal or greater than 2)', () => {
            expect(
              calculator.calculateDiscount(mockOrderItem, [mockOrderItem]),
            ).toBe(0);
          });
        });
      });

      describe('And an order item with a product of price 100, and quantity 2', () => {
        const mockOrderItem: OrderItemEntity = {
          product: {
            id: 'dummy-product-id',
            name: 'Dummy Product',
            price: 100,
            discountCampaigns: [],
            imageUrl: 'https://dummyimage.com/100x100/000/fff',
          },
          quantity: 2,
        };

        describe('When call calculator.calculateDiscount() to calculate discount', () => {
          it('Then should return 10 ((100 x 2) x 5%)', () => {
            expect(
              calculator.calculateDiscount(mockOrderItem, [mockOrderItem]),
            ).toBe(10);
          });
        });
      });

      describe('And an order item with a product of price 100, and quantity 3', () => {
        const mockOrderItem: OrderItemEntity = {
          product: {
            id: 'dummy-product-id',
            name: 'Dummy Product',
            price: 100,
            discountCampaigns: [],
            imageUrl: 'https://dummyimage.com/100x100/000/fff',
          },
          quantity: 3,
        };

        describe('When call calculator.calculateDiscount() to calculate discount', () => {
          it('Then should return 10 ((100 x 2) x 5%)', () => {
            expect(
              calculator.calculateDiscount(mockOrderItem, [mockOrderItem]),
            ).toBe(10);
          });
        });
      });

      describe('And an order item with a product of price 100, and quantity 4', () => {
        const mockOrderItem: OrderItemEntity = {
          product: {
            id: 'dummy-product-id',
            name: 'Dummy Product',
            price: 100,
            discountCampaigns: [],
            imageUrl: 'https://dummyimage.com/100x100/000/fff',
          },
          quantity: 4,
        };

        describe('When call calculator.calculateDiscount() to calculate discount', () => {
          it('Then should return 20 ((100 x 4) x 5%)', () => {
            expect(
              calculator.calculateDiscount(mockOrderItem, [mockOrderItem]),
            ).toBe(20);
          });
        });
      });
    });
  });
});
