import { GetAnalysisUserDTO } from './dto/user/get-analysis-user.dto';
import { CreateAnalysisEventDTO } from './dto/event/create-analysis-event.dto';
import { CreateAnalysisUserDTO } from './dto/user/create-analysis-user.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { AnalysisUserModel } from 'src/analysis/analysisUser.model';
import { AnalysisUserLogModel } from 'src/analysis/analysisUserLog.model';
import { AnalysisEventModel } from './analysisEvent.model';
import { AnalysisUserDauModel } from './analysisUserDau.model';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectModel('AnalysisUser')
    private readonly analysisUserModel: Model<AnalysisUserModel>,
    @InjectModel('AnalysisUserLog')
    private readonly analysisUserLogModel: Model<AnalysisUserLogModel>,
    @InjectModel('AnalysisEvent')
    private readonly analysisEventModel: Model<AnalysisEventModel>,
    @InjectModel('AnalysisUserDau')
    private readonly analysisUserDauModel: Model<AnalysisUserDauModel>,
  ) {}
  async createUser(createAnalysisUserDTO: CreateAnalysisUserDTO) {
    const { account, accountName } = createAnalysisUserDTO;
    const user = await this.analysisUserModel.findOne({
      account: account,
    });
    if (user) {
      const newLog = new this.analysisUserLogModel({ userid: user.id });
      user.accountName = accountName;
      await user.save();
      const resLog = await newLog.save();
      if (!resLog) throw new NotFoundException();
      return null;
    } else {
      const newUser = new this.analysisUserModel(createAnalysisUserDTO);
      const resUser = await newUser.save();
      if (!resUser) throw new NotFoundException();
      return resUser;
    }
  }
  async createUserWithDate(account: string, accountName: string, date: Date) {
    const user = await this.analysisUserModel.findOne({
      account: account,
    });
    if (user) {
      const newLog = new this.analysisUserLogModel({ userid: user.id });
      user.accountName = accountName;
      await user.save();
      newLog.createdAt = date;
      const resLog = await newLog.save();
      if (!resLog) throw new NotFoundException();
      return null;
    } else {
      const newUser = new this.analysisUserModel({
        account: account,
        accountName: accountName,
      });
      newUser.createdAt = date;
      const resUser = await newUser.save();
      if (!resUser) throw new NotFoundException();
      return resUser;
    }
  }
  async getUserDAU(getAnalysisUserDTO: GetAnalysisUserDTO) {
    const { startDate, endDate } = getAnalysisUserDTO;
    const _startDate = new Date(startDate);
    const _endDate = new Date(endDate);
    const _todayDate = new Date();
    _todayDate.setHours(0,0,0,0);
    const user = await this.analysisUserLogModel.aggregate([
        {$match:{createdAt:{$gte:_todayDate}}},
        {$group:{_id:"$userid",count:{$sum:1}}},
        {$group:{_id:"ymd",dau:{"$sum":1}}}])
    return user;
  }
  async getUserWAU() {}
  async getUserMAU() {}
  async getUserNRU() {}

  async createEvent(createAnalysisEventDTO: CreateAnalysisEventDTO) {
    const newEvent = new this.analysisEventModel(createAnalysisEventDTO);
    const res = await newEvent.save();
    return res;
  }
  // @Cron('0 5 0 * * 1-7')
  // @Cron('* * * * * *')
  async createDau() {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1)
    yesterdayDate.setHours(0, 0, 0, 0);
    const dauData = await this.analysisUserLogModel.aggregate([
      { $match: { createdAt: { $gte: yesterdayDate,$lte:todayDate } } },
      { $group: { _id: '$userid', count: { $sum: 1 } } },
      { $group: { _id: 'ymd', dau: { $sum: 1 } } },
    ]);
    let dau = 0;
    if(dauData && dauData.length>0)
      dau = dauData[0].dau;
    else
      throw new NotFoundException();
    const newDau = new this.analysisUserDauModel({dau:dau,date:yesterdayDate});
    newDau.save()
    return newDau;
  }
}
