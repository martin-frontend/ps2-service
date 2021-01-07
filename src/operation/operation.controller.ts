import { UpdateOperationBanDTO } from './dto/ban/update-operation-ban.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { OperationService } from './operation.service';
import {
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
} from '@nestjs/common';
import { CreateOperationBanDTO } from './dto/ban/create-operation-ban.dto';

@Controller('operation')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}
  @Post('/createban')
  @UseInterceptors(FileInterceptor('body'))
  @UsePipes(ValidationPipe)
  async createBan(@Body() createOperationBanDTO: CreateOperationBanDTO) {
    const Ban = await this.operationService.createBan(createOperationBanDTO);
    if (Ban) {
      return { success: true, content: null, msg: '新增成功' };
    } else {
      return { success: false, content: null, msg: '新增失敗' };
    }
  }
  
  @Post('/updateban')
  @UseInterceptors(FileInterceptor('body'))
  @UsePipes(ValidationPipe)
  async updateBan(@Body() updateOperationBanDTO: UpdateOperationBanDTO) {
    const Ban = await this.operationService.updateBan(updateOperationBanDTO);
    if (Ban) {
      return { success: true, content: null, msg: '更新成功' };
    } else {
      return { success: false, content: null, msg: '更新失敗' };
    }
  }

  @Get('/getban')
  async getRole() {
    const Bans = await this.operationService.getBans();
    if (Bans) {
      return { success: true, content: Bans, msg: '查詢成功' };
    } else {
      return { success: false, content: null, msg: '查無資料' };
    }
  }

}
