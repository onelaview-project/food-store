import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemEntity } from './order-item.entity';
import { OrderService } from './order.service';
import { DiscountService } from '../discount/discount.service';

describe('OrderService', () => {
  let orderService: OrderService;

  describe('Given a mock discountService.calculateOrderItemDiscount() returns 3', () => {
    beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        providers: [
          OrderService,
          {
            provide: DiscountService,
            useValue: {
              calculateOrderItemDiscount: jest.fn().mockReturnValue(3),
            },
          },
        ],
      }).compile();

      orderService = app.get(OrderService);
    });

    describe('And 2 order items where the first one is eligible for discount and the second one is NOT eligible for discount', () => {
      const mockOrderItems: OrderItemEntity[] = [
        {
          product: {
            id: 'dummy-product-id-1',
            name: 'Dummy Product 1',
            price: 100,
            discountCampaigns: ['MOCK_DISCOUNT_CAMPAIGN_CALCULATOR'], // Eligible for discount
          },
          quantity: 2,
        },
        {
          product: {
            id: 'dummy-product-id-2',
            name: 'Dummy Product 2',
            price: 200,
            discountCampaigns: [], // NOT eligible for discount
          },
          quantity: 2,
        },
      ];

      describe('When call calculateOrderPrice with a given order items', () => {
        describe('And with member card number', () => {
          const memberCardNumber = '1234567890';

          it('Then should return correct output', () => {
            const output = orderService.calculateOrderPrice({
              memberCardNumber,
              items: mockOrderItems,
            });

            expect(output.totalPriceBeforeDiscount).toBe(600);
            expect(output.discountItems).toEqual([
              {
                productId: 'dummy-product-id-1',
                discount: 3,
              },
            ]);
            expect(output.discountFromMemberCard).toBe(59.7);
          });
        });

        describe('And without member card number', () => {
          const memberCardNumber = null;

          it('Then should return correct output', () => {
            const output = orderService.calculateOrderPrice({
              memberCardNumber,
              items: mockOrderItems,
            });

            expect(output.totalPriceBeforeDiscount).toBe(600);
            expect(output.discountItems).toEqual([
              {
                productId: 'dummy-product-id-1',
                discount: 3,
              },
            ]);
            expect(output.discountFromMemberCard).toBe(0);
          });
        });
      });
    });
  });
});
