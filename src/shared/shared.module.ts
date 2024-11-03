import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { SettingService } from './services/setting.service';
import { PrismaService } from './prisma/prisma.service';

const providers = [SettingService, PrismaService];

@Global()
@Module({
  providers,
  imports: [HttpModule],
  exports: [...providers, HttpModule],
})
export class SharedModule {}
