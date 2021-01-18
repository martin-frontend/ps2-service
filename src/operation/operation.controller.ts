import { GetOperationAnnounceDTO } from './dto/announce/get-operation-announce.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetOperationBanDTO } from './dto/ban/get-operation-ban.dto';
import { DeleteOperationAnnounceDTO } from './dto/announce/delete-operation-announce.dto';
import { UpdateOperationAnnounceDTO } from './dto/announce/update-operation-announce.dto';
import { AuthService } from 'src/auth/auth.service';
import { CreateOperationAnnounceDTO } from './dto/announce/create-operation-announce.dto';
import { UpdateOperationCategoryDTO } from './dto/category/update-operation-category.dto';
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
  Put,
  Query,
  Delete,
  Request
} from '@nestjs/common';
import { CreateOperationBanDTO } from './dto/ban/create-operation-ban.dto';

@ApiTags('operation')
@Controller('operation')
export class OperationController {
  constructor(private readonly operationService: OperationService,
    private readonly authService: AuthService) {}
  @Post('/ban')
  @ApiOperation({summary:"",description:"新增帳號停權"})
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
  
  @Put('/ban')
  @ApiOperation({summary:"",description:"修改帳號停權"})
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

  @Get('/ban')
  @ApiOperation({summary:"",description:"取得帳號停權"})
  @UsePipes(ValidationPipe)
  async getBan(@Query() getOperationBanDTO:GetOperationBanDTO) {
    const Bans = await this.operationService.getBans(getOperationBanDTO);
    if (Bans) {
      return { success: true, content: Bans, msg: '查詢成功' };
    } else {
      return { success: false, content: null, msg: '查無資料' };
    }
  }
  @Get('/ban-list')
  @ApiOperation({summary:"對外API",description:"取得停權中名單"})
  @UsePipes(ValidationPipe)
  async getBanList() {
    const Bans = await this.operationService.getBansList();
    if (Bans) {
      return { success: true, content: Bans, msg: '查詢成功' };
    } else {
      return { success: false, content: null, msg: '查無資料' };
    }
  }

  @Post('/announce')
  @ApiOperation({summary:"",description:"新增線上公告"})
  @UseInterceptors(FileInterceptor('body'))
  @UsePipes(ValidationPipe)
  async createAnnounce(@Body() createOperationAnnounceDTO: CreateOperationAnnounceDTO,@Request() req) {
    const validateUser: any = await this.authService.validateUser(req.cookies.AuthCookie);
    createOperationAnnounceDTO['creator'] = validateUser.account
    const Announce = await this.operationService.createAnnounce(createOperationAnnounceDTO);      
    return Announce;
  }

  @Get('/announce')
  @ApiOperation({summary:"",description:"取得線上公告"})
  @UsePipes(ValidationPipe)
  async getAnnounce(@Query() getOperationAnnounceDTO:GetOperationAnnounceDTO) {
    const Announces = await this.operationService.getAnnounces(getOperationAnnounceDTO);
    if (Announces) {
      return { success: true, content: Announces, msg: '查詢成功' };
    } else {
      return { success: false, content: null, msg: '查無資料' };
    }
  }
  @Get('/announce-list')
  @ApiOperation({summary:"對外API",description:"取得上架中名單"})
  @UsePipes(ValidationPipe)
  async getAnnounceList() {
    const Announces = await this.operationService.getAnnouncesList();
    if (Announces) {
      return { success: true, content: Announces, msg: '查詢成功' };
    } else {
      return { success: false, content: null, msg: '查無資料' };
    }
  }

  @Put('/announce')
  @ApiOperation({summary:"",description:"修改線上公告"})
  @UseInterceptors(FileInterceptor('body'))
  @UsePipes(ValidationPipe)
  async updateAnnounce(@Body() updateOperationAnnounceDTO: UpdateOperationAnnounceDTO,@Request() req) {
    const validateUser: any = await this.authService.validateUser(req.cookies.AuthCookie);
    updateOperationAnnounceDTO['creator'] = validateUser.account
    const Announce = await this.operationService.updateAnnounce(updateOperationAnnounceDTO);      
    if (Announce) {
      return { success: true, content: null, msg: '更新成功' };
    } else {
      return { success: false, content: null, msg: '更新失敗' };
    }
  }

  @Delete('/announce')
  @ApiOperation({summary:"",description:"刪除線上公告"})
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

  @Get('/announce/category')
  @ApiOperation({summary:"",description:"取得線上公告分類"})
  @UsePipes(ValidationPipe)
  async getAnnounceCategory() {
    const Category = await this.operationService.getAnnounceCategory();
    if (Category) {
      return { success: true, content: Category, msg: '查詢成功' };
    } else {
      return { success: false, content: null, msg: '查無資料' };
    }
  }

  @Put('/announce/category')
  @ApiOperation({summary:"",description:"修改線上公告分類"})
  @UseInterceptors(FileInterceptor('body'))
  @UsePipes(ValidationPipe)
  async updateAnnounceCategory(@Body() updateOperationCategoryDTO: UpdateOperationCategoryDTO) {
    const result = await this.operationService.updateAnnounceCategory(updateOperationCategoryDTO);      
    if (result) {
      return { success: true, content: null, msg: '更新成功' };
    } else {
      return { success: false, content: null, msg: '更新失敗' };
    }
  }
}
