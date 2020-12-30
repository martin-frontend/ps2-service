import { Module } from '@nestjs/common';
import { AuthorityController } from './authority.controller';
import { AuthorityService } from '../service/authority.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorityRolesSchema } from 'src/model/authorityRoles.model';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'AuthorityRoles', schema: AuthorityRolesSchema }]),
  ],
  controllers: [AuthorityController],
  providers: [AuthorityService]
})
export class AuthorityModule {}
