import { AnalysisService } from 'src/analysis/analysis.service';
import { Injectable } from '@nestjs/common';
import { Command, Positional } from 'nestjs-command';
import * as moment from 'moment';
import { InjectModel } from '@nestjs/mongoose';
import { AnalysisUserLogModel } from 'src/analysis/analysisUserLog.model';
import { AnalysisUserModel } from 'src/analysis/analysisUser.model';
import { AnalysisUserDauModel } from './analysisUserDau.model';
import { AnalysisUserWauModel } from './analysisUserWau.model';
import { AnalysisUserMauModel } from './analysisUserMau.model';
import { AnalysisUserNruModel } from './analysisUserNru.model';
import { Model } from 'mongoose';
@Injectable()
export class AnalysisSeed {
  constructor(
    private readonly analysisService: AnalysisService,
    @InjectModel('AnalysisUser')
    private readonly analysisUserModel: Model<AnalysisUserModel>,
    @InjectModel('AnalysisUserLog')
    private readonly analysisUserLogModel: Model<AnalysisUserLogModel>,
    @InjectModel('AnalysisUserDau')
    private readonly analysisUserDauModel: Model<AnalysisUserDauModel>,
    @InjectModel('AnalysisUserWau')
    private readonly analysisUserWauModel: Model<AnalysisUserWauModel>,
    @InjectModel('AnalysisUserMau')
    private readonly analysisUserMauModel: Model<AnalysisUserMauModel>,
    @InjectModel('AnalysisUserNru')
    private readonly analysisUserNruModel: Model<AnalysisUserNruModel>,
    ) {}
  @Command({
    command: 'create:analysisUser <username> <count>',
    describe: '',
    autoExit: true,
  })
  async createUserSeed(
    @Positional({ name: 'username', describe: '', type: 'string' })
    username: string,
    @Positional({ name: 'count', describe: '', type: 'number' }) count: number,
  ) {
    for (let i = 0; i < count; i++) {
      await this.analysisService.createUserWithDate(
        username + String(i),
        username + String(i),
        moment().valueOf(),
      );
    }
  }

  @Command({
    command: 'create:analysisUserLog <username> <count>',
    describe: '',
    autoExit: true,
  })
  async createUserLogSeed(
    @Positional({ name: 'username', describe: '', type: 'string' })
    username: string,
    @Positional({ name: 'count', describe: '', type: 'number' }) count: number,
  ) {
    for (let i = 0; i < count; i++) {
      await this.analysisService.createUserWithDate(
        username,
        username,
        moment().valueOf(),
      );
    }
  }

  // 讀取去年每天dau的假資料
  @Command({
    command: 'read:lastYearDau <count>',
    describe: '',
    autoExit: true,
  })
  async readLastYearDau(    
    @Positional({ name: 'count', describe: '', type: 'number' }) count: number,
  ) {
    // const count = 372
    const dauArray = [];
    for (let index = 0; index <= count; index++) {
       const startOfDay = moment().add(-376+index, 'd').startOf('day').valueOf()
      const lastOfDay = moment().add(-376+index, 'd').endOf('day').valueOf()        
      // // 塞入dau資料表
      const dauData = await this.analysisUserLogModel.aggregate([
        { $match: { createdAt: { $gte: startOfDay,$lte:lastOfDay } } },
        { $group: { _id: startOfDay, dau: { $sum: 1 } } },       
      ]);    
      
      if (dauData && dauData.length > 0) dauArray.push({dau:dauData[0].dau,date:startOfDay});
      else dauArray.push({dau:0,date:startOfDay})          
    }
    for (let index = 0; index < dauArray.length; index++) {
      const newDau = new this.analysisUserDauModel({
              dau: dauArray[index].dau,
              date: dauArray[index].date,
            }); 
            await newDau.save();          
    }    
  }

 // 讀取去年每周Wau的假資料
  @Command({
    command: 'read:lastYearWau <count>',
    describe: '',
    autoExit: true,
  })
  async readLastYearWau(
    @Positional({ name: 'count', describe: '', type: 'number' }) count: number,
  ) {
    const wauArray = [];
    for (let index = 0; index <= count; index++) {
       const lastWeekOfMonday = moment().add(-54+index, 'w').startOf('day').valueOf()
      const lastWeekOfSunday = moment().add(-54+index, 'w').endOf('day').valueOf()

      // 塞入wau資料表
      const wauData = await this.analysisUserLogModel.aggregate([
        { $match: { createdAt: { $gte: lastWeekOfMonday,$lte:lastWeekOfSunday } } },
        { $group: { _id: lastWeekOfMonday, wau: { $sum: 1 } } },
      ]);    
      
      console.log(wauData);
      if (wauData && wauData.length > 0) wauArray.push({wau:wauData[0].wau,date:lastWeekOfMonday});
      else wauArray.push({wau:0,date:lastWeekOfMonday})         
    }    
    for (let index = 0; index < wauArray.length; index++) {
      const newWau = new this.analysisUserWauModel({
              wau: wauArray[index].wau,
              date: wauArray[index].date,
            }); 
            await newWau.save();          
    }       
  }
  // 讀取去年每月Mau的假資料
  @Command({
    command: 'read:lastYearMau <count>',
    describe: '',
    autoExit: true,
  })
  async readLastYearMau(
    @Positional({ name: 'count', describe: '', type: 'number' }) count: number,
  ) {
    // const count = 11
    const mauArray = [];
    for (let index = 0; index <= count; index++) {
      const startOfMonth = moment().add(-12+index,'M').startOf('month').valueOf()
      const lastOfMonth = moment().add(-12+index,'M').endOf('month').valueOf()
      
      // 塞入mau資料表
      const mauData = await this.analysisUserLogModel.aggregate([
        { $match: { createdAt: { $gte: startOfMonth,$lte:lastOfMonth } } },
        { $group: { _id: startOfMonth, mau: { $sum: 1 } } },
      ]);    
      
      if (mauData && mauData.length > 0) mauArray.push({mau:mauData[0].mau,date:startOfMonth});
      else mauArray.push({mau:0,date:startOfMonth})          
    }
    for (let index = 0; index < mauArray.length; index++) {
      const newMau = new this.analysisUserMauModel({
              mau: mauArray[index].mau,
              date: mauArray[index].date,
            }); 
            await newMau.save();          
    }      
  }

  // 讀取去年每日Nru的假資料
  @Command({
    command: 'read:lastYearNru <count>',
    describe: '',
    autoExit: true,
  })
  async readLastYearNru(
    @Positional({ name: 'count', describe: '', type: 'number' }) count: number,
  ) {
    // const count = 372
    const nruArray = [];
    for (let index = 0; index <= count; index++) {
      const startOfDay = moment().add(-376+index, 'd').startOf('day').valueOf()
      const endOfDay = moment().add(-376+index, 'd').endOf('day').valueOf()
         
      // 塞入nru資料表
      const nruData = await this.analysisUserModel.aggregate([
        { $match: { createdAt: { $gte: startOfDay,$lte:endOfDay } } },
        { $group: { _id: startOfDay, nru: { $sum: 1 } } },
      ]);          
      if (nruData && nruData.length > 0) nruArray.push({nru:nruData[0].nru,date:startOfDay});
      else nruArray.push({nru:0,date:startOfDay});       
    }   
    for (let index = 0; index < nruArray.length; index++) {
      const newNru = new this.analysisUserNruModel({
              nru: nruArray[index].nru,
              date: nruArray[index].date,
            }); 
            await newNru.save();          
    }   
  }

  // 寫入去年每天user log的假資料
  @Command({
    command: 'create:analysisUserLog <username> <count>',
    describe: '',
    autoExit: true,
  })
  async createLastYearUserLogSeed(
    @Positional({ name: 'username', describe: '', type: 'string' })
    username: string,
    @Positional({ name: 'count', describe: '', type: 'number' }) count: number,
  ) {

    for (let index = 0; index <= count; index++) {
      const addDate =-377+index
      const lastWeekOfDay = moment().add(addDate,'days').startOf('days').valueOf()      
      await this.analysisService.createUserWithDate(
        username+Math.floor(Math.random() * Math.floor(10)),
        username,
        lastWeekOfDay,
      );
    }    
  }
}
