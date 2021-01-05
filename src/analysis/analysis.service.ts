import { GetAnalysisUserDTO } from './dto/user/get-analysis-user.dto';
import { CreateAnalysisEventDTO } from './dto/event/create-analysis-event.dto';
import { CreateAnalysisUserDTO } from './dto/user/create-analysis-user.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { AnalysisUserModel } from 'src/analysis/analysisUser.model';
import { AnalysisUserLogModel } from 'src/analysis/analysisUserLog.model';
import { AnalysisEventModel } from './analysisEvent.model';
import * as moment from 'moment'



@Injectable()
export class AnalysisService {
    constructor(
        @InjectModel('AnalysisUser') private readonly analysisUserModel: Model<AnalysisUserModel>,
        @InjectModel('AnalysisUserLog') private readonly analysisUserLogModel: Model<AnalysisUserLogModel>,
        @InjectModel('AnalysisEvent') private readonly analysisEventModel: Model<AnalysisEventModel>,
    ) {}
    async createUser(createAnalysisUserDTO:CreateAnalysisUserDTO) {
        const {account} = createAnalysisUserDTO
        const user = await this.analysisUserModel.findOne({
            account:account,
        })
        if(user){
            const newLog = new this.analysisUserLogModel({userid:user.id});        
            const resLog = await newLog.save();
            if(!resLog)
                throw new NotFoundException();
            return null;
        }
        else{
            const newUser = new this.analysisUserModel(createAnalysisUserDTO);
            const resUser = await newUser.save();
            if(!resUser)
                throw new NotFoundException();
            return resUser;
        }
    }
    //1:DAU、2:WAU、3:MAU、4:NRU
    // async getUser(getAnalysisUserDTO:GetAnalysisUserDTO) {
    //     const {mode,startDate,endDate} = getAnalysisUserDTO
    //     let _startDate = new Date(startDate)
    //     let _endDate = new Date(endDate)
    //     switch(mode){
    //         case "1":
    //             const user = await this.analysisUserModel.find({
    //                 createdAt:{
    //                     $gte:_startDate,
    //                     $lte:_endDate
    //                 }
    //             })
    //             return user;
    //         case "2":
    //             return 2;
    //         case "3":
    //             return 3;
    //         case "4":
    //             return 4;
    //     }
    // }
    async getUserDAU (){        
    }
    async getUserWAU (){        
    }
    async getUserMAU (){        
    }
    async getUserNRU (){        
    }
    
    async createEvent(createAnalysisEventDTO:CreateAnalysisEventDTO) {
        const newEvent = new this.analysisEventModel(createAnalysisEventDTO);
        const res = await newEvent.save();
        return res;
    }
}