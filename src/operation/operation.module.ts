import { AuthorityRolesSchema } from 'src/authority/authorityRoles.model';
import { RolesName } from './../authority/authorityRoles.model';
import { AnnounceName, operationAnnounceSchema } from './operationAnnounce.model';
import { MongooseModule } from '@nestjs/mongoose';
import { BanName, operationBanSchema } from './operationBan.model';
import { Module } from '@nestjs/common';
import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';
import { AuthService } from 'src/auth/auth.service';
import { UserName, UserSchema } from 'src/user/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserName, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: RolesName, schema: AuthorityRolesSchema },
    ]),
    MongooseModule.forFeature([{ name: AnnounceName, schema: operationAnnounceSchema }]),
    MongooseModule.forFeature([{ name: BanName, schema: operationBanSchema }]),
  ],
  controllers: [OperationController],
  providers: [OperationService,AuthService],
})
export class OperationModule {}
