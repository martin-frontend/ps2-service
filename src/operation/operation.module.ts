import { MongooseModule } from '@nestjs/mongoose';
import { operationBanSchema } from './operationBan.model';
import { Module } from '@nestjs/common';
import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'OperationBan', schema: operationBanSchema }]),
  ],
  controllers: [OperationController],
  providers: [OperationService]
})
export class OperationModule {}
