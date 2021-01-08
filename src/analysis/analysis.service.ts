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
import { AnalysisUserWauModel } from './analysisUserWau.model';
import { AnalysisUserMauModel } from './analysisUserMau.model';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';

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
    @InjectModel('AnalysisUserWau')
    private readonly analysisUserWauModel: Model<AnalysisUserWauModel>,
    @InjectModel('AnalysisUserMau')
    private readonly analysisUserMauModel: Model<AnalysisUserMauModel>,
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
  async createUserWithDate(account: string, accountName: string, date: number) {

    const user = await this.analysisUserModel.findOne({
      account: account,
    });
    if (user) {
      const newLog = new this.analysisUserLogModel({ userid: user.id,createdAt:date });
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
  async getDauForToday() {
    const _todayDate = new Date();
    _todayDate.setHours(0, 0, 0, 0);
    const user = await this.analysisUserLogModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: _todayDate,
          },
        },
      },
      { $group: { _id: '$userid', count: { $sum: 1 } } },
      { $group: { _id: 'ymd', dau: { $sum: 1 } } },
    ]);
    return user;
  }
  logModeAggregate (startDate) {
    return this.analysisUserLogModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate
          }
        }
      },
      {
        $group: {
          _id:"$userid"
        }
      },
      {
        $group: {
          _id: startDate,
          dau: {
            "$sum":1
          }
        }
      }
    ])
  }
  async getUserDAU(getAnalysisUserDTO: GetAnalysisUserDTO) {
    const { startDate, endDate } = getAnalysisUserDTO;
    const _startDate = Number(startDate);
    const _endDate = Number(endDate);
    const _todayDate = moment().startOf('day').valueOf();
    // _todayDate.setHours(0,0,0,0);
    const user = await this.analysisUserDauModel.find({"date" : { $gte: _startDate, $lt: _endDate }})
    if(_endDate >= _todayDate) { //需轉毫秒比較
      const todayUser = await this.logModeAggregate(_todayDate)
      todayUser[0]["date"] =  todayUser[0]["_id"]
      return todayUser.concat(...user)
    }
    return user;
  }
  async getUserWAU(getAnalysisUserDTO: GetAnalysisUserDTO) {
    const { startDate, endDate } = getAnalysisUserDTO;
    const _startDate = Number(startDate);
    const _endDate = Number(endDate);
    const day = new Date().getDay() || 7; // Sunday - Saturday : 0 - 6
    const firstDayOfWeek = moment(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1 - day)).valueOf()
    const wau = await this.analysisUserWauModel.find({"date" : { $gte: _startDate, $lt: _endDate }})
    if(_endDate >= firstDayOfWeek) { //需轉毫秒比較
      const thisWeekUser = await this.logModeAggregate(firstDayOfWeek)
      thisWeekUser[0]["date"] =  thisWeekUser[0]["_id"]
      thisWeekUser[0]["wau"] =  thisWeekUser[0]["dau"]
      return thisWeekUser.concat(...wau)
    }
    return wau;
  }
  async getUserMAU(getAnalysisUserDTO: GetAnalysisUserDTO) {
    const { startDate, endDate } = getAnalysisUserDTO;
    const _startDate = Number(startDate);
    const _endDate = Number(endDate);
    const firstDayOfMonth = moment(new Date(new Date().getFullYear(), new Date().getMonth())).valueOf()
    const mau = await this.analysisUserMauModel.find({"date" : { $gte: _startDate, $lt: _endDate }})
    if(_endDate >= firstDayOfMonth) { //需轉毫秒比較
      const thisMonthUser = await this.logModeAggregate(firstDayOfMonth)
      thisMonthUser[0]["date"] =  thisMonthUser[0]["_id"]
      thisMonthUser[0]["mau"] =  thisMonthUser[0]["dau"]
      return thisMonthUser.concat(...mau)
    }
    return mau;
  }
  async getUserNRU(getAnalysisUserDTO: GetAnalysisUserDTO) {
    const { startDate, endDate } = getAnalysisUserDTO;
    const _startDate = new Date(startDate);
    const _endDate = new Date(endDate);
    const _todayDate = new Date();
    _todayDate.setHours(0,0,0,0);
    const user = await this.analysisUserModel.aggregate([
        {$match:{createdAt:{$gte:_todayDate}}},
        {$group:{_id:"ymd",dau:{"$sum":1}}}])
    return user;
  }

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

  @Cron('* * * * * *')
  async createWau() {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const lastWeekOfMonday = new Date(
      todayDate.setDate(todayDate.getDate() - 6),
    ).setHours(0, 0, 0, 0);
    const lastWeekOfSunday = new Date(
      todayDate.setDate(todayDate.getDate() - todayDate.getDay()),
    ).setHours(23, 59, 59, 999);
    //塞入wau資料表
    const wauData = await this.analysisUserLogModel.aggregate([
        { $match: { createdAt: { $gte: lastWeekOfMonday,$lte:lastWeekOfSunday } } },
        { $group: { _id: {user:'$userid',ymd: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }}, count: { $sum: 1 } } },
        { $group: { _id: '$_id.ymd', dau: { $sum: 1 } } },
      ]);    
    let wau = 0;
    if (wauData && wauData.length > 0) wau = wauData[0].wau;
    else throw new NotFoundException();
    const newWau = new this.analysisUserWauModel({
      wau: wau,
      date: lastWeekOfMonday,
    });
    newWau.save();
    return newWau;
  }

  // @Cron('* * * * * *')
  async createMau() {          
      const lastWeekOfMonday = moment().add(-1,'M').startOf('days')   
      const lastWeekOfSunday = moment().startOf('month').add(-1,'d').endOf('days')
      
      //塞入mau資料表
      const mauData = await this.analysisUserLogModel.aggregate([
          { $match: { createdAt: { $gte: lastWeekOfMonday,$lte:lastWeekOfSunday } } },
          { $group: { _id: { user:'$userid',date: '$createdAt'}, count: { $sum: 1 } } },
          { $group: { _id :'date', mau: { $sum: 1 } } },
        ]);    
      let mau = {};
      if (mauData && mauData.length > 0) mau = mauData[0].mau;
      else throw new NotFoundException();
      const newMau = new this.analysisUserMauModel({
        mau: mau,
        date: lastWeekOfMonday,
      });    
      newMau.save();
      return newMau;
    }  
}
