import { Module } from '@nestjs/common';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { MongooseModule } from '@nestjs/mongoose';
import { analysisUserSchema } from './analysisUser.model';
import { analysisUserLogSchema } from './analysisUserLog.model';
import { analysisEventSchema } from './analysisEvent.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'AnalysisUser', schema: analysisUserSchema }]),
    MongooseModule.forFeature([{ name: 'AnalysisUserLog', schema: analysisUserLogSchema }]),
    MongooseModule.forFeature([{ name: 'AnalysisEvent', schema: analysisEventSchema }]),
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService]
})
export class AnalysisModule {}
