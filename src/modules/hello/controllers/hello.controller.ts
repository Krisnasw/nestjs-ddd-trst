import { TransformResponseInterceptor } from '@/interceptors/response.interceptor';
import { ApiCustomHeader } from '@/shared/swagger/decorator';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { Router } from 'nestjs-trpc';
import { ApiTags } from '@nestjs/swagger';
import { HelloService } from '../services/hello.service';

@ApiTags('Hello')
@ApiCustomHeader()
@UseInterceptors(TransformResponseInterceptor)
@Controller('hello')
@Router({ alias: 'hello' })
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getHello() {
    return this.helloService.getHello();
  }
}
