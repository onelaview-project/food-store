import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async listProducts(): Promise<ProductEntity[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
    // throw new Error('Error fetching products'); // Simulate an error
    return this.productService.findAll();
  }
}
