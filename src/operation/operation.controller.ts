import { FileInterceptor } from '@nestjs/platform-express';
import { OperationService } from './operation.service';
import { Controller, Post, UseInterceptors, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { CreateOperationBanDTO } from './dto/ban/create-operation-ban.dto';


@Controller('operation')
export class OperationController {
    constructor(private readonly operationService: OperationService) {}
    @Post('/ban')
    @UseInterceptors(FileInterceptor('body'))
    @UsePipes(ValidationPipe)
    async createUser(
        @Body() createOperationBanDTO:CreateOperationBanDTO
    ){
        const Ban = await this.operationService.createBan(createOperationBanDTO)
        if(Ban){
            return {"success":true,"content":null,"msg":"新增成功"}
        }else{
            return {"success":false,"content":null,"msg":"新增失敗"}
        }
    }
}
