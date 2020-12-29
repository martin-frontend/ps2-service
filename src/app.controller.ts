import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @Header('Content-Type', 'text/html')
  getHomeMsg() {
    return "welcome bill's node test";
  }
}
