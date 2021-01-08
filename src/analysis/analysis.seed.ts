import { AnalysisService } from 'src/analysis/analysis.service';
import { Injectable } from '@nestjs/common';
import { Command, Positional } from 'nestjs-command';
import * as moment from 'moment';
@Injectable()
export class AnalysisSeed {
  constructor(private readonly analysisService: AnalysisService) {}
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

  // 寫入去年每周user log的假資料
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
      const addDate =-365+index*7
      const lastWeekOfDay = moment().add(addDate,'days').startOf('days').valueOf()      
      await this.analysisService.createUserWithDate(
        username+Math.floor(Math.random() * Math.floor(10)),
        username,
        lastWeekOfDay,
      );
    }    
  }
}
