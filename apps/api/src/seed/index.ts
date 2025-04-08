import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import seedDiscountCampaigns from './seed-discount-campaign';
import seedProducts from './seed-product';
import Redis from 'ioredis';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  await seedDiscountCampaigns(app);
  await seedProducts(app);
  console.log('All seeding completed successfully');

  // This is important to close the Redis connection to avoid app hanging
  // though the seeding process doesn't involve Redis
  const redis = app.get<Redis>('REDIS_CLIENT');
  await redis.quit();

  await app.close();
}

void bootstrap();
