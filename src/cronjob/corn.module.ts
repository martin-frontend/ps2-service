import { AnalysisUserDauName, analysisUserDauSchema } from './../analysis/analysisUserDau.model';
import { analysisEventSchema, EventName } from './../analysis/analysisEvent.model';
import { AnalysisUserLogName, analysisUserLogSchema } from './../analysis/analysisUserLog.model';
import { AnalysisUserName, analysisUserSchema } from './../analysis/analysisUser.model';
import { MongooseModule } from '@nestjs/mongoose';
import { DauCorn } from './dau.corn';
import { AnalysisService } from 'src/analysis/analysis.service';

import { Module } from '@nestjs/common';
@Module({  
  imports: [
    MongooseModule.forFeature([
      { name: AnalysisUserName, schema: analysisUserSchema },
    ]),
    MongooseModule.forFeature([
      { name: AnalysisUserLogName, schema: analysisUserLogSchema },
    ]),
    MongooseModule.forFeature([
      { name: EventName, schema: analysisEventSchema },
    ]),
    MongooseModule.forFeature([
      { name: AnalysisUserDauName, schema: analysisUserDauSchema },
    ]),
  ],
  providers: [AnalysisService,DauCorn],
  
})
export class CornModule {}
