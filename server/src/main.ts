import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Migration from './migration';

async function bootstrap() {
  Migration.execute();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
