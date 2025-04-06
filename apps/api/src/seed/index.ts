import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import seedDiscountCampaigns from './seed-discount-campaign';
import seedProducts from './seed-product';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  await seedDiscountCampaigns(app);
  await seedProducts(app);
  console.log('All seeding completed successfully');

  await app.close();
}

void bootstrap();
