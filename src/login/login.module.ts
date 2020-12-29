import { Module } from '@nestjs/common';
import { LoginController } from 'src/login/login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '@service/user.service';
import { UserSchema } from 'src/model/user.model';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [LoginController],
  providers: [UserService]
})
export class LoginModule {}
