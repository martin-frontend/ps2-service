import { AnalysisSeed } from './analysis.seed';
import { Module } from '@nestjs/common';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { MongooseModule } from '@nestjs/mongoose';
import { analysisUserSchema,AnalysisUserName } from './analysisUser.model';
import { analysisUserLogSchema,AnalysisUserLogName } from './analysisUserLog.model';
import { analysisEventSchema,EventName } from './analysisEvent.model';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: AnalysisUserName, schema: analysisUserSchema }]),
    MongooseModule.forFeature([{ name: AnalysisUserLogName, schema: analysisUserLogSchema }]),
    MongooseModule.forFeature([{ name: EventName, schema: analysisEventSchema }]),
    
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService,AnalysisSeed]
})
export class AnalysisModule {}
