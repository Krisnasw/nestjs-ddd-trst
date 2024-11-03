import { NestApplication, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SharedModule } from './shared/shared.module';
import { SettingService } from './shared/services/setting.service';
import {
  ClassSerializerInterceptor,
  NestInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import helmet from 'helmet';
import { setupSwagger } from './shared/swagger/setup';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);

  const settingService = app.select(SharedModule).get(SettingService);
  const globalInterceptors: NestInterceptor[] = [
    new ClassSerializerInterceptor(app.get(Reflector)),
  ];

  app.use(helmet());

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  app.useGlobalInterceptors(...globalInterceptors);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: {
        target: false,
      },
    }),
  );

  if (['development', 'staging'].includes(settingService.nodeEnv)) {
    setupSwagger(app, settingService.swaggerConfig);
  }

  app.setGlobalPrefix('api');

  const port = settingService.getNumber('PORT') || 4000;
  const host = settingService.get('HOST') || '0.0.0.0';
  await app.listen(port, host);

  console.warn(`server running on port ${host}:${port}`);
}
bootstrap();
