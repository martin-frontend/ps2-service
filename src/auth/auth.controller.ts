import { ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Response,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseInterceptors(FileInterceptor('body'))
  @UsePipes(ValidationPipe)
  async login(@Body() loginDTO: LoginDTO, @Response() res) {
    const user = await this.authService.login(loginDTO);
    if (user) {      
      if (user.status === '1') {
        const generatedjwt = await this.authService.createToken(user.id);
        //一小時過期
        res.cookie('AuthCookie', generatedjwt, {
          maxAge: 3600 * 60000,
          httpOnly: false,
        });
        res.send({
          success: true,
          content: { islogin: true,token:generatedjwt },
          msg: '登入成功',
        });
      } else {
        res.send({
          success: false,
          content: { islogin: false },
          msg: '使用者已遭停權，登入失敗',
        });
      }
    } else {
      res.send({
        success: false,
        content: { islogin: false },
        msg: '帳號或密碼錯誤，登入失敗',
      });
    }
  }
}
