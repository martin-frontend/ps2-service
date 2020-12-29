import { Module } from '@nestjs/common';
import { LoginController } from '@controller/login.controller';

@Module({
  controllers: [LoginController]
})
export class LoginModule {}
