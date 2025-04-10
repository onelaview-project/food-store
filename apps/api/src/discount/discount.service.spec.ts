import { Test, TestingModule } from '@nestjs/testing';
import { DiscountService } from './discount.service';
import { DiscountCampaignCalculatorAbstract } from 'discount-campaign/discount-campaign-calculators/discount-campaign-calculator.abstract';
import { OrderItemEntity } from 'order/entities/order-item.entity';

describe('• DiscountService', () => {
  let discountService: DiscountService;

  describe('• discountService.calculateOrderItemDiscount()', () => {
    describe('Given a mockCampaignDiscountCalculator and a discountService', () => {
      let mockCampaignDiscountCalculator: jest.Mocked<DiscountCampaignCalculatorAbstract>;

      beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
          providers: [
            DiscountService,
            {
              provide: 'MOCK_DISCOUNT_CAMPAIGN_CALCULATOR',
              useValue: {
                calculateDiscount: jest.fn().mockReturnValue(10),
              },
            },
          ],
        }).compile();

        discountService = app.get(DiscountService);
        mockCampaignDiscountCalculator = app.get(
          'MOCK_DISCOUNT_CAMPAIGN_CALCULATOR',
        );
      });

      describe('And an order item with a product that has discount campaign associating with the given mockCampaignDiscountCalculator', () => {
        const mockOrderItem: OrderItemEntity = {
          product: {
            id: 'dummy-product-id',
            name: 'Dummy Product',
            price: 100,
            discountCampaigns: ['MOCK_DISCOUNT_CAMPAIGN_CALCULATOR'], // Eligible for discount
            imageUrl: 'https://dummyimage.com/100x100/000/fff',
          },
          quantity: 2,
        };

        describe('When call discountService.calculateOrderItemDiscount() with a given order item', () => {
          it('Then the mockCampaignDiscountCalculator.calculateDiscount() should have been called 1 time', () => {
            discountService.calculateOrderItemDiscount(mockOrderItem, [
              mockOrderItem,
            ]);

            expect(
              // eslint-disable-next-line @typescript-eslint/unbound-method
              mockCampaignDiscountCalculator.calculateDiscount,
            ).toHaveBeenCalledTimes(1);
          });
        });
      });

      describe('And an order item with a product that has NO discount campaign', () => {
        const mockOrderItem: OrderItemEntity = {
          product: {
            id: 'dummy-product-id',
            name: 'Dummy Product',
            price: 100,
            discountCampaigns: [], // NOT eligible for discount
            imageUrl: 'https://dummyimage.com/100x100/000/fff',
          },
          quantity: 2,
        };

        describe('When call discountService.calculateOrderItemDiscount() with a given order item', () => {
          it('Then should throw an error', () => {
            const thrower = () =>
              discountService.calculateOrderItemDiscount(mockOrderItem, [
                mockOrderItem,
              ]);

            expect(thrower).toThrow(
              'Nest could not find given element (this provider does not exist in the current context)',
            );
          });
        });
      });
    });
  });

  describe('• discountService.calculateMemberCardDiscount()', () => {
    describe('Given a discountService', () => {
      beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
          providers: [DiscountService],
        }).compile();

        discountService = app.get(DiscountService);
      });

      describe('When call discountService.calculateMemberCardDiscount() with a given total price of 100', () => {
        it('Then should return 10', () => {
          expect(discountService.calculateMemberCardDiscount(100)).toBe(10);
        });
      });
    });
  });
});
