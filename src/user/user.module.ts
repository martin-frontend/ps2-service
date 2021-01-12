import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { UserSchema, UserName } from 'src/user/user.model';
import { AuthorityRolesSchema,RolesName } from 'src/authority/authorityRoles.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserName, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: RolesName, schema: AuthorityRolesSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}
