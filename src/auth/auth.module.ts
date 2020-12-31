import { Module } from '@nestjs/common';
import { AuthService } from '@service/auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/model/user.model';
import { AuthorityRolesSchema } from 'src/model/authorityRoles.model';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'AuthorityRoles', schema: AuthorityRolesSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
