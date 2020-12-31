import { Module } from '@nestjs/common';
import { AuthorityController } from './authority.controller';
import { AuthorityService } from '../service/authority.service';
import { UserService } from '@service/user.service'
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorityRolesSchema } from 'src/model/authorityRoles.model';
import { UserSchema } from 'src/model/user.model';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'AuthorityRoles', schema: AuthorityRolesSchema }]),
  ],
  controllers: [AuthorityController],
  providers: [AuthorityService,UserService]
})
export class AuthorityModule {}
