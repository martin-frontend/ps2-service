import { GetAnalysisUserLogDTO } from './dto/user/get-analysis-user-log.dto';
import { CreateAnalysisEventDTO } from './dto/event/create-analysis-event.dto';
import { CreateAnalysisUserDTO } from './dto/user/create-analysis-user.dto';
import { GetAnalysisUserDTO } from './dto/user/get-analysis-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { AnalysisService } from 'src/analysis/analysis.service';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}
  @Post('/user')
  @UseInterceptors(FileInterceptor('body'))
  @UsePipes(ValidationPipe)
  async createUser(@Body() createAnalysisUserDTO: CreateAnalysisUserDTO) {
    const user = await this.analysisService.createUser(createAnalysisUserDTO);
    if (user) {
      return { success: true, content: null, msg: '新增成功' };
    } else {
      return { success: true, content: null, msg: '更新成功' };
    }
  }
  @Post('/getuser')
  @UseInterceptors(FileInterceptor('body'))
  @UsePipes(ValidationPipe)
  async getUser(@Body() getAnalysisUserDTO: GetAnalysisUserDTO) {
    const user = await this.analysisService.getUser(getAnalysisUserDTO)
    if (user) {
      return { success: true, content: user, msg: '查詢成功' };
    } else {
      return { success: true, content: null, msg: '查詢成功' };
    }
  }
  @Post('/getuserlog')
  @UseInterceptors(FileInterceptor('body'))
  @UsePipes(ValidationPipe)
  async getUserLog(@Body() getAnalysisUserLogDTO:GetAnalysisUserLogDTO) {
    const userlog = await this.analysisService.getUserLog(getAnalysisUserLogDTO)
    if (userlog) {
      return { success: true, content: userlog, msg: '查詢成功' };
    } else {
      return { success: true, content: null, msg: '查詢成功' };
    }
  }
  @Post('/getuserdau')
  @UseInterceptors(FileInterceptor('body'))
  async getUserDAU(@Body() getAnalysisUserDTO: GetAnalysisUserDTO) {
    const dau = await this.analysisService.getUserDAU(getAnalysisUserDTO);
    const newDau = dau.map((item) => [item["date"],item["dau"]])
    if (newDau) {
      return { success: true, content: newDau, msg: '查詢成功' };
    } else {
      return { success: false, content: null, msg: '查詢失敗' };
    }
  }
  @Post('/getuserwau')
  @UseInterceptors(FileInterceptor('body'))
  async getUserWAU(@Body() getAnalysisUserDTO: GetAnalysisUserDTO) {
    const wau = await this.analysisService.getUserWAU(getAnalysisUserDTO);
    const newWau = wau.map((item) => [item["date"],item["wau"]])
    if (newWau) {
      return { success: true, content: newWau, msg: '查詢成功' };
    } else {
      return { success: false, content: null, msg: '查詢失敗' };
    }
  }
  @Post('/getusermau')
  @UseInterceptors(FileInterceptor('body'))
  async getUserMAU(@Body() getAnalysisUserDTO: GetAnalysisUserDTO) {
    const mau = await this.analysisService.getUserMAU(getAnalysisUserDTO);
    const newMau = mau.map((item) => [item["date"],item["mau"]])
    if (newMau) {
      return { success: true, content: newMau, msg: '查詢成功' };
    } else {
      return { success: false, content: null, msg: '查詢失敗' };
    }

  }
  @Post('/getusernru')
  @UseInterceptors(FileInterceptor('body'))
  async getUserNRU(@Body() getAnalysisUserDTO: GetAnalysisUserDTO) {
    const nru = await this.analysisService.getUserNRU(getAnalysisUserDTO);
    const newNru = nru.map((item) => [item["date"],item["nru"]])
    if (newNru) {
      return { success: true, content: newNru, msg: '查詢成功' };
    } else {
      return { success: false, content: null, msg: '查詢失敗' };
    }
  }
  @Post('/event')
  @UseInterceptors(FileInterceptor('body'))
  @UsePipes(ValidationPipe)
  async createEvent(@Body() createAnalysisEventDTO: CreateAnalysisEventDTO) {
    const event = await this.analysisService.createEvent(
      createAnalysisEventDTO,
    );
    if (event) {
      return { success: true, content: null, msg: '新增成功' };
    } else {
      return { success: false, content: null, msg: '新增失敗' };
    }
  }
}
