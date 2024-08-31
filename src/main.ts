import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('TechWave Movies API')
    .setDescription(
      'TechWave Movie API is a simple movie management service built using NestJS. This API provides CRUD operations for movies, including listing, creating, updating, and deleting movies. The application follows best practices in architecture, separating concerns into modules and utilizing dependency injection for scalable development.'
    )
    .setVersion('1.0')
    .addTag('movie-api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT);
  console.log(`App is running on port ${process.env.PORT}`);
}
bootstrap();
