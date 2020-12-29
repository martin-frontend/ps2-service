import { Controller,Post,Body } from '@nestjs/common';
import {AuthService} from '@service/auth.service'

@Controller('login')
export class LoginController {
    constructor(private readonly authService: AuthService) {}
    @Post()
    async login(
        @Body("account") account:string,
        @Body("password") password:string,
    ){
        const generatedUserId = await this.authService.login(
            account,
            password,
        );
        return { id: generatedUserId };        
    }
}
 