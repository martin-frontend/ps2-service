import { GetAnalysisUserDTO } from './dto/user/get-analysis-user.dto';
import { CreateAnalysisEventDTO } from './dto/event/create-analysis-event.dto';
import { CreateAnalysisUserDTO } from './dto/user/create-analysis-user.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { AnalysisUserModel,AnalysisUserName } from 'src/analysis/analysisUser.model';
import { AnalysisUserLogModel,AnalysisUserLogName } from 'src/analysis/analysisUserLog.model';
import { AnalysisEventModel,EventName } from './analysisEvent.model';
import { AnalysisUserDauModel,AnalysisUserDauName } from './analysisUserDau.model';
import { AnalysisUserWauModel,AnalysisUserWauName } from './analysisUserWau.model';
import { AnalysisUserMauModel,AnalysisUserMauName } from './analysisUserMau.model';
import { AnalysisUserNruModel,AnalysisUserNruName } from './analysisUserNru.model';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectModel(AnalysisUserName)
    private readonly analysisUserModel: Model<AnalysisUserModel>,
    @InjectModel(AnalysisUserLogName)
    private readonly analysisUserLogModel: Model<AnalysisUserLogModel>,
    @InjectModel(EventName)
    private readonly analysisEventModel: Model<AnalysisEventModel>,
    @InjectModel(AnalysisUserDauName)
    private readonly analysisUserDauModel: Model<AnalysisUserDauModel>,
    @InjectModel(AnalysisUserWauName)
    private readonly analysisUserWauModel: Model<AnalysisUserWauModel>,
    @InjectModel(AnalysisUserMauName)
    private readonly analysisUserMauModel: Model<AnalysisUserMauModel>,
    @InjectModel(AnalysisUserNruName)
    private readonly analysisUserNruModel: Model<AnalysisUserNruModel>,
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
  async getUser(getAnalysisUserDTO: GetAnalysisUserDTO){
    const {account,accountName} = getAnalysisUserDTO;
    if(account){
      const user = await this.analysisUserModel.find({account:account})
      if (!user) {
        throw new NotFoundException("not found account");
      }
      return user;
    }
    else if(accountName){
      const user = await this.analysisUserModel.find({accountName:accountName})
      if (!user) {
        throw new NotFoundException("not found accountName");
      }
      return user;
    }
    else{
      const user = await this.analysisUserModel.find({})
      if (!user) {
        throw new NotFoundException("not found accountName");
      }
      return user;
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
  async logModeAggregate (startDate) {
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
  userAggregate (startDate) {
    return this.analysisUserModel.aggregate([
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
    const todayDate = moment().startOf('day').valueOf();
    const user = await this.analysisUserDauModel.find({"date" : { $gte: _startDate, $lt: _endDate }})
    if(_endDate >= todayDate) {
      const todayUser = await this.logModeAggregate(todayDate)
      if(todayUser.length > 0) {
        todayUser[0]["date"] =  todayUser[0]["_id"]
      } else {
        todayUser[0] = {
          "date": todayDate,
          "dau": "0"
        }
      }
      return todayUser.concat(...user)
    }
    return user;
  }
  async getUserWAU(getAnalysisUserDTO: GetAnalysisUserDTO) {
    const { startDate, endDate } = getAnalysisUserDTO;
    const _startDate = Number(startDate);
    const _endDate = Number(endDate);
    const firstDayOfWeek = moment().startOf('week').add(1,'d').valueOf()
    const user = await this.analysisUserWauModel.find({"date" : { $gte: _startDate, $lt: _endDate }})
    if(_endDate >= firstDayOfWeek) {
      const thisWeekUser = await this.logModeAggregate(firstDayOfWeek)
      if(thisWeekUser.length > 0) {
        thisWeekUser[0]["date"] =  thisWeekUser[0]["_id"]
        thisWeekUser[0]["wau"] =  thisWeekUser[0]["dau"]
      } else {
        thisWeekUser[0] = {
          "date": firstDayOfWeek,
          "wau": "0"
        }
      }
      return thisWeekUser.concat(...user)
    }
    return user;
  }
  async getUserMAU(getAnalysisUserDTO: GetAnalysisUserDTO) {
    const { startDate, endDate } = getAnalysisUserDTO;
    const _startDate = Number(startDate);
    const _endDate = Number(endDate);
    const firstDayOfMonth = moment().startOf('month').valueOf()
    const user = await this.analysisUserMauModel.find({"date" : { $gte: _startDate, $lt: _endDate }})
    if(_endDate >= firstDayOfMonth) {
      const thisMonthUser = await this.logModeAggregate(firstDayOfMonth)
      if(thisMonthUser.length > 0) {
        thisMonthUser[0]["date"] =  thisMonthUser[0]["_id"]
        thisMonthUser[0]["mau"] =  thisMonthUser[0]["dau"]
      } else {
        thisMonthUser[0] = {
          "date": firstDayOfMonth,
          "mau": "0"
        }
      }
      return thisMonthUser.concat(...user)
    }
    return user;
  }
  async getUserNRU(getAnalysisUserDTO: GetAnalysisUserDTO) {
    const { startDate, endDate } = getAnalysisUserDTO;
    const _startDate = Number(startDate);
    const _endDate = Number(endDate);
    const todayDate = moment().startOf('day').valueOf();
    const user = await this.analysisUserNruModel.find({"date" : { $gte: _startDate, $lt: _endDate }})
    if(_endDate >= todayDate) {
      const todayUser = await this.userAggregate(todayDate)
      if(todayUser.length > 0) {
        todayUser[0]["date"] =  todayUser[0]["_id"]
        todayUser[0]["nru"] =  todayUser[0]["dau"]
      } else {
        todayUser[0] = {
          "date": todayDate,
          "nru": "0"
        }
      }
      return todayUser.concat(...user)
    }
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
    const startOfDay = moment().add(-1, 'd').startOf('day').valueOf()  
    const endOfDay= moment().add(-1, 'd').endOf('day').valueOf()      
    const dauData = await this.analysisUserLogModel.aggregate([
      { $match: { createdAt: { $gte: startOfDay,$lte:endOfDay } } },
      { $group: { _id: '$userid', count: { $sum: 1 } } },
      { $group: { _id: 'ymd', dau: { $sum: 1 } } },
    ]);
    let dau = 0;
    if(dauData && dauData.length>0)
      dau = dauData[0].dau;
    else
     dau = 0;
    const newDau = new this.analysisUserDauModel({dau:dau,date:startOfDay});
    newDau.save()
    return newDau;
  }

  // @Cron('* * * * * *')
  async createWau() {   
    const lastWeekOfMonday = moment().add(-1, 'w').startOf('day').valueOf()
    const lastWeekOfSunday =moment().add(-1, 'w').endOf('day').valueOf()

    //塞入wau資料表
    const wauData = await this.analysisUserLogModel.aggregate([
        { $match: { createdAt: { $gte: lastWeekOfMonday,$lte:lastWeekOfSunday } } },
        { $group: { _id: {user:'$userid',ymd: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }}, count: { $sum: 1 } } },
        { $group: { _id: '$_id.ymd', wau: { $sum: 1 } } },
      ]);    
    let wau = 0;
    if (wauData && wauData.length > 0) wau = wauData[0].wau;
    else wau =0;
    const newWau = new this.analysisUserWauModel({
      wau: wau,
      date: lastWeekOfMonday,
    });
    newWau.save();
    return newWau;
  }

  // @Cron('* * * * * *')
  async createMau() {          
      const firstOfMonth = moment().add(-1,'M').startOf('month').valueOf()
      const endOfMonth = moment().add(-1,'M').endOf('month').valueOf()
      
      //塞入mau資料表
      const mauData = await this.analysisUserLogModel.aggregate([
          { $match: { createdAt: { $gte: firstOfMonth,$lte:endOfMonth } } },
          { $group: { _id: { user:'$userid',date: '$createdAt'}, count: { $sum: 1 } } },
          { $group: { _id :'date', mau: { $sum: 1 } } },
        ]);    

      let mau = {};
      if (mauData && mauData.length > 0) mau = mauData[0].mau;
      else mau = 0;
      const newMau = new this.analysisUserMauModel({
        mau: mau,
        date: firstOfMonth,
      });    
      newMau.save();
      return newMau;
    }  
    
    //@Cron('55 03 14 * * *')
  async createNru() {          
    const startOfDay = moment().add(-1,'d').startOf('days').valueOf() 
    const lastOfDay = moment().add(-1,'d').endOf('days').valueOf() 
    
    //塞入nru資料表
    const nruData = await this.analysisUserModel.aggregate([
        { $match: { createdAt: { $gte: startOfDay,$lte:lastOfDay } } },
        { $group: { _id: { user:'$userid',date: '$createdAt'}, count: { $sum: 1 } } },
        { $group: { _id :'date', nru: { $sum: 1 } } },
      ]);    

    let nru = {};
    if (nruData && nruData.length > 0) nru = nruData[0].nru;
    else nru = 0;
    const newNru = new this.analysisUserNruModel({
      nru: nru,
      date: startOfDay,
    });    
    newNru.save();
    return newNru;
  } 

}
