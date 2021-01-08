import { analysisUserDauSchema, AnalysisUserDauName } from './analysisUserDau.model';
import { analysisUserWauSchema, AnalysisUserWauName } from './analysisUserWau.model';
import { analysisUserMauSchema, AnalysisUserMauName } from './analysisUserMau.model';
import { analysisUserNruSchema, AnalysisUserNruName } from './analysisUserNru.model';
import { AnalysisSeed } from './analysis.seed';
import { Module } from '@nestjs/common';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { MongooseModule } from '@nestjs/mongoose';
import { analysisUserSchema, AnalysisUserName } from './analysisUser.model';
import {
  analysisUserLogSchema,
  AnalysisUserLogName,
} from './analysisUserLog.model';
import { analysisEventSchema, EventName } from './analysisEvent.model';

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
    MongooseModule.forFeature([
      { name: AnalysisUserWauName, schema: analysisUserWauSchema },
    ]),
    MongooseModule.forFeature([
      { name: AnalysisUserMauName, schema: analysisUserMauSchema },
    ]),
    MongooseModule.forFeature([
      { name: AnalysisUserNruName, schema: analysisUserNruSchema },
    ]),
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService, AnalysisSeed],
})
export class AnalysisModule {}
