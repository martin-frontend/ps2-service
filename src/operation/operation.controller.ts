import { DeleteOperationAnnounceDTO } from './dto/announce/delete-operation-announce.dto';
import { UpdateOperationAnnounceDTO } from './dto/announce/update-operation-announce.dto';
import { AuthService } from 'src/auth/auth.service';
import { CreateOperationAnnounceDTO } from './dto/announce/create-operation-announce.dto';
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
  constructor(private readonly operationService: OperationService,
    private readonly authService: AuthService) {}
  @Post('/createban')
  @UseInterceptors(FileInterceptor('body'))
  @UsePipes(ValidationPipe)
  async createBan(@Body() createOperationBanDTO: CreateOperationBanDTO) {
    const Ban = await this.operationService.createBan(createOperationBanDTO);      
    if(Ban.created){
      if(Ban.content.length>0)
        return { success: true, content: Ban.content, msg: '新增成功，尚有重複資料需確認' };
      else
        return { success: true, content: null, msg: '新增成功' };        
    }
    else{
      if(Ban.content.length>0)
        return { success: false, content: Ban.content, msg: '新增失敗，尚有重複資料需確認' };
      else
        return { success: false, content: null, msg: '新增成功' }; 
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


  @Post('/createannounce')
  @UseInterceptors(FileInterceptor('body'))
  @UsePipes(ValidationPipe)
  async createAnnounce(@Body() createOperationAnnounceDTO: CreateOperationAnnounceDTO) {
    const {token} = createOperationAnnounceDTO
    const validateUser: any = await this.authService.validateUser(
      token
    );
    createOperationAnnounceDTO['creator'] = validateUser.account
    const Announce = await this.operationService.createAnnounce(createOperationAnnounceDTO);      
    return Announce;
  }

  @Get('/getannounce')
  async getAnnounce() {
    const Announces = await this.operationService.getAnnounces();
    if (Announces) {
      return { success: true, content: Announces, msg: '查詢成功' };
    } else {
      return { success: false, content: null, msg: '查無資料' };
    }
  }

  @Post('/updateannounce')
  @UseInterceptors(FileInterceptor('body'))
  @UsePipes(ValidationPipe)
  async updateAnnounce(@Body() updateOperationAnnounceDTO: UpdateOperationAnnounceDTO) {
    const {token} = updateOperationAnnounceDTO
    const validateUser: any = await this.authService.validateUser(
      token
    );
    updateOperationAnnounceDTO['creator'] = validateUser.account
    const Announce = await this.operationService.updateAnnounce(updateOperationAnnounceDTO);      
    if (Announce) {
      return { success: true, content: null, msg: '更新成功' };
    } else {
      return { success: false, content: null, msg: '更新失敗' };
    }
  }

  @Post('/deleteannounce')
  @UseInterceptors(FileInterceptor('body'))
  @UsePipes(ValidationPipe)
  async deleteAnnounce(@Body() deleteOperationAnnounceDTO: DeleteOperationAnnounceDTO) {
    const result = await this.operationService.deleteAnnounce(deleteOperationAnnounceDTO);
    if (result) {
      return { success: true, content: null, msg: '刪除成功' };
    } else {
      return { success: false, content: null, msg: '刪除失敗' };
    }
  } 

}
