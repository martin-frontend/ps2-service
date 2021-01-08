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
import { AnalysisUserNruModel } from './analysisUserNru.model';
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
    @InjectModel('AnalysisUserNru')
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
    console.log(_endDate);
    
    if(_endDate >= todayDate) {
      const todayUser = await this.userAggregate(todayDate)
      console.log(todayUser);
      
      if(todayUser.length > 0) {
        todayUser[0]["date"] =  todayUser[0]["_id"]
        todayUser[0]["nru"] =  todayUser[0]["dau"]
      } else {
        todayUser[0] = {
          "date": todayDate,
          "nru": "0"
        }
      }
      console.log(todayUser);
      
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
    
    @Cron('55 03 14 * * *')
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

  // @Cron('* * * * * *')
  async createLastYearDau() {
      const count = 372
      const dauArray = [];
      for (let index = 0; index <= count; index++) {
         const startOfDay = moment().add(-373+index, 'd').startOf('day').valueOf()
        const lastOfDay = moment().add(-373+index, 'd').endOf('day').valueOf()        
        console.log(startOfDay);
        // // 塞入dau資料表
        const dauData = await this.analysisUserLogModel.aggregate([
          { $match: { createdAt: { $gte: startOfDay,$lte:lastOfDay } } },
          { $group: { _id: { user:'$userid', date: '$createdAt' }, count: { $sum: 1 } } },
          { $group: { _id: 'date', dau: { $sum: 1 } } },
        ]);    
        
        if (dauData && dauData.length > 0) dauArray.push({dau:dauData[0].dau,date:startOfDay});
        else dauArray.push({dau:0,date:startOfDay})          
      }
      dauArray.forEach(element => {
          const newDau = new this.analysisUserDauModel({
            dau: element.dau,
            date: element.date,
          });        
          newDau.save();
        });
    }

    // @Cron('* * * * * *')
  async createLastYearWau() {
      const count = 52
      const wauArray = [];
      for (let index = 0; index <= count; index++) {
         const lastWeekOfMonday = moment().add(-53+index, 'w').startOf('day').valueOf()
        const lastWeekOfSunday = moment().add(-53+index, 'w').endOf('day').valueOf()
  
        // 塞入wau資料表
        const wauData = await this.analysisUserLogModel.aggregate([
          { $match: { createdAt: { $gte: lastWeekOfMonday,$lte:lastWeekOfSunday } } },
          { $group: { _id: { user:'$userid', date: '$createdAt' }, count: { $sum: 1 } } },
          { $group: { _id: 'date', wau: { $sum: 1 } } },
        ]);    
        
        if (wauData && wauData.length > 0) wauArray.push({wau:wauData[0].wau,date:lastWeekOfMonday});
        else wauArray.push({wau:0,date:lastWeekOfMonday})         
      }
        wauArray.forEach(element => {
          const newWau = new this.analysisUserWauModel({
            wau: element.wau,
            date: element.date,
          });        
          newWau.save();
        });
    }
    
    // @Cron('* * * * * *')
    async createLastYearMau() {
      const count = 11
      const mauArray = [];
      for (let index = 0; index <= count; index++) {
        const startOfMonth = moment().add(-12+index,'M').startOf('month').valueOf()
        const lastOfMonth = moment().add(-12+index,'M').endOf('month').valueOf()
        
        // 塞入mau資料表
        const mauData = await this.analysisUserLogModel.aggregate([
          { $match: { createdAt: { $gte: startOfMonth,$lte:lastOfMonth } } },
          { $group: { _id: { user:'$userid', date: '$createdAt' }, count: { $sum: 1 } } },
          { $group: { _id: startOfMonth, mau: { $sum: 1 } } },
        ]);    
        
        if (mauData && mauData.length > 0) mauArray.push({mau:mauData[0].mau,date:startOfMonth});
        else mauArray.push({mau:0,date:startOfMonth})          
      }
      mauArray.forEach(element => {
        const newMau = new this.analysisUserMauModel({
          mau: element.mau,
          date: element.date,
        });        
        newMau.save();
      });
    }

    // @Cron('* * * * * *')
    @Cron('30 56 16 * * *')
    async createLastYearNru() {
      const count = 372
      const nruArray = [];
      for (let index = 0; index <= count; index++) {
         const startOfDay = moment().add(-373+index, 'd').startOf('day').valueOf()
        const endOfDay = moment().add(-373+index, 'd').endOf('day').valueOf()
        
        // 塞入wau資料表
        const nruData = await this.analysisUserModel.aggregate([
          { $match: { createdAt: { $gte: startOfDay,$lte:endOfDay } } },
          { $group: { _id: { user:'$userid', date: '$createdAt' }, count: { $sum: 1 } } },
          { $group: { _id:startOfDay , nru: { $sum: 1 } } },
        ]);    
        console.log(moment(startOfDay));
        
        if (nruData && nruData.length > 0) nruArray.push({nru:nruData[0].nru,date:startOfDay});
        else nruArray.push({nru:0,date:startOfDay});       
      }
      console.log(nruArray);
      
      nruArray.forEach(element => {
          const newNru = new this.analysisUserNruModel({
            nru: element.nru,
            date: element.date,
          });        
          newNru.save();
        });
    }
}
