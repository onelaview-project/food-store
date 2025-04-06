import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let productController: ProductController;

  describe('Given a mock productService', () => {
    let productService: jest.Mocked<ProductService>;

    beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        controllers: [ProductController],
        providers: [
          {
            provide: ProductService,
            useValue: {
              findAll: jest.fn().mockResolvedValue([
                {
                  id: '1',
                  name: 'Product 1',
                  price: 100,
                  DiscountCampaigns: [],
                },
              ]),
            },
          },
        ],
      }).compile();

      productController = app.get(ProductController);
      productService = app.get(ProductService);
    });

    describe('When listProducts() is called', () => {
      it('Then should call productService.findAll()', async () => {
        await productController.listProducts();
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(productService.findAll).toHaveBeenCalledTimes(1);
      });
    });
  });
});
