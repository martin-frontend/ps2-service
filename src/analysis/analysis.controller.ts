import { CreateAnalysisEventDTO } from './dto/event/create-analysis-event.dto';
import { CreateAnalysisUserDTO } from './dto/user/create-analysis-user.dto';
import { GetAnalysisUserDTO } from './dto/user/get-analysis-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Post, UsePipes, ValidationPipe, UseInterceptors, Body } from '@nestjs/common';
import { AnalysisService } from 'src/analysis/analysis.service';

@Controller('analysis')
export class AnalysisController {
    constructor(private readonly analysisService: AnalysisService) {}
    @Post('/user')
    @UseInterceptors(FileInterceptor('body'))
    @UsePipes(ValidationPipe)
    async createUser(
        @Body() createAnalysisUserDTO:CreateAnalysisUserDTO
    ){
        const user = await this.analysisService.createUser(createAnalysisUserDTO)
        if(user){
            return {"success":true,"content":null,"msg":"新增成功"}
        }else{
            return {"success":true,"content":null,"msg":"更新成功"}
        }
    }
    @Post('/getuser')
    @UseInterceptors(FileInterceptor('body'))
    @UsePipes(ValidationPipe)
    async getUser(
        @Body() getAnalysisUserDTO:GetAnalysisUserDTO
    ){
        // const user = await this.analysisService.getUser(getAnalysisUserDTO)
        // return user;
    }
    @Post('/getUserDAU')
    @UseInterceptors(FileInterceptor('body'))
    @UsePipes(ValidationPipe)
    async getUserDAU(
        @Body() getAnalysisUserDTO:GetAnalysisUserDTO
    ){
        const dau = await this.analysisService.getUserDAU(getAnalysisUserDTO)
        return dau;
    }
    @Post('/event')
    @UseInterceptors(FileInterceptor('body'))
    @UsePipes(ValidationPipe)
    async createEvent(
        @Body() createAnalysisEventDTO:CreateAnalysisEventDTO
    ){
        const event = await this.analysisService.createEvent(createAnalysisEventDTO)
        if(event){
            return {"success":true,"content":null,"msg":"新增成功"}
        }else{
            return {"success":false,"content":null,"msg":"新增失敗"}
        }
    }
}
