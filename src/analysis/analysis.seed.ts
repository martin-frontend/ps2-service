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
}
