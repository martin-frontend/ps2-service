import { Controller,Post,Body,UseInterceptors } from '@nestjs/common';
import {AuthService} from '@service/auth.service'
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('login')
export class LoginController {
    constructor(private readonly authService: AuthService) {}
    @Post()
    @UseInterceptors(FileInterceptor('body'))
    async login(
        @Body() body
    ){
        const user = await this.authService.login(
            body.account,
            body.password,
        );
        if(user){
            return {"success":true,"content":{islogin:true},"msg":"查詢成功"}
        }else{
            return {"success":false,"content":{islogin:false},"msg":"查無資料"}
        }
    }
}

