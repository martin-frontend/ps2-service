import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/user/user.controller';
import { UserService } from '@service/user.service';
import { AuthService } from '@service/auth.service';
import { UserSchema } from 'src/model/user.model';
import { AuthorityRolesSchema } from 'src/model/authorityRoles.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'AuthorityRoles', schema: AuthorityRolesSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService,AuthService]
})
export class UserModule {}
