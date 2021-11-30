import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.TCP_HOST,
      port: process.env.TCP_PORT,
    },
  });
  // const app = await NestFactory.create(AppModule);

  await app.listen();
  Logger.log('info', `Server running`);
}
bootstrap();
