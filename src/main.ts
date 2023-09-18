import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { ValidationPipe } from '@nestjs/common';
// import dataSource from './database/data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await dataSource.initialize();
  const configService = app.get(ConfigService);
  console.log(configService, 11);
  // const port = configService.get<number>('PORT');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(8005);
}
bootstrap();
