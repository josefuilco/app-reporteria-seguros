import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Migrations from './migration/Migrations';

async function bootstrap() {
  Migrations.exec();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
