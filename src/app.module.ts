import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TerminusModule } from '@nestjs/terminus';
import { ScheduleModule as CronModule } from '@nestjs/schedule';
import { TRPCModule } from 'nestjs-trpc';

import { SettingService } from './shared/services/setting.service';
import { RequestContextModule } from '@medibloc/nestjs-request-context';
import { AbstractRequestContext } from './common/contexts/abstract-request.context';
import { SharedModule } from './shared/shared.module';
import { HelloModule } from './modules/hello/hello.module';
import { TrpcPanelController } from './shared/trpc-panel/trpc-panel.controller';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (settingService: SettingService) => ({
        secret: settingService.jwtConfig.secretKey,
      }),
      inject: [SettingService],
    }),
    RequestContextModule.forRoot({
      contextClass: AbstractRequestContext,
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    CronModule.forRoot(),
    TRPCModule.forRoot({
      autoSchemaFile: './src/@generated',
    }),
    TerminusModule,
    SharedModule,
    HelloModule,
  ],
  controllers: [AppController, TrpcPanelController],
  providers: [AppService],
})
export class AppModule {}
