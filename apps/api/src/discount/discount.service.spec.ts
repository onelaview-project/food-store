import { Test, TestingModule } from '@nestjs/testing';
import { DiscountService } from './discount.service';
import { DiscountCampaignCalculatorAbstract } from 'discount-campaign/discount-campaign-calculators/discount-campaign-calculator.abstract';
import { OrderItemEntity } from 'order/entities/order-item.entity';

describe('DiscountService', () => {
  let discountService: DiscountService;

  describe('Given a mock discount campaign calculator available in DI container', () => {
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

    describe('And an order item with a product that should apply discount from the given mock discount campaign', () => {
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

      describe('When call calculateOrderItemDiscount with a given order item', () => {
        it("Then should call mock discount campaign calculator's calculateDiscount method", () => {
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

    describe('And an order item with a product that has NOT discount campaign', () => {
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

      describe('When call calculateOrderItemDiscount with a given order item', () => {
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
