import { NestApplication, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';

export class Application {
  private readonly port: string | number;
  private readonly nodeEnv: string;
  protected app: NestApplication;

  constructor() {
    this.port = process.env.DD_PORT || 8080;
    this.nodeEnv = process.env.NODE_ENV;
  }
  public async init() {
    this.app = await NestFactory.create(AppModule, {
      bodyParser: true,
    });
    useContainer(this.app.select(AppModule), { fallbackOnErrors: true });
    this.appHeaders();
    await this.initSwaggerDoc();
    await this.app.listen(this.port);
  }

  private appHeaders() {
    this.app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
  }

  private async initSwaggerDoc() {
    const config = new DocumentBuilder().setTitle('Detect Data API').setVersion('1.0').build();
    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('api-docs', this.app, document);
  }
}
