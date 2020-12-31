import { Controller,Post,Body,UseInterceptors,Response } from '@nestjs/common';
import { AuthService } from '@service/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}
   
    @Post('login')
    @UseInterceptors(FileInterceptor('body'))
    async login(
        @Body() body,
        @Response() res
    ){
        const user = await this.authService.login(
            body.account,
            body.password,
        );
        if(user){
            const generatedjwt = await this.authService.createToken(user.id);
            res.cookie('AuthCookie',generatedjwt,{maxAge:3600,httpOnly:false})
            res.send({"success":true,"content":{islogin:true},"msg":"查詢成功"})
        }else{
            res.send({"success":false,"content":{islogin:false},"msg":"查無資料"})
        }
    }
}
 