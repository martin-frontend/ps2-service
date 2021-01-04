import { CreateAnalysisEventDTO } from './dto/event/create-analysis-event.dto';
import { CreateAnalysisUserDTO } from './dto/user/create-analysis-user.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AnalysisUserModel } from 'src/analysis/analysisUser.model';
import { AnalysisEventModel } from './analysisEvent.model';


@Injectable()
export class AnalysisService {
    constructor(
        @InjectModel('AnalysisUser') private readonly analysisUserModel: Model<AnalysisUserModel>,
        @InjectModel('AnalysisEvent') private readonly analysisEventModel: Model<AnalysisEventModel>,
    ) {}
    async createUser(createAnalysisUserDTO:CreateAnalysisUserDTO) {
        const newUser = new this.analysisUserModel(createAnalysisUserDTO);
        const res = await newUser.save();
        return res;
    }
    async createEvent(createAnalysisEventDTO:CreateAnalysisEventDTO) {
        const newEvent = new this.analysisEventModel(createAnalysisEventDTO);
        const res = await newEvent.save();
        return res;
    }
}
