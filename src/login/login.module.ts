import { Module } from '@nestjs/common';
import { LoginController } from 'src/login/login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from '@service/auth.service';
import { UserSchema } from 'src/model/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [LoginController],
  providers: [AuthService]
})
export class LoginModule {}
