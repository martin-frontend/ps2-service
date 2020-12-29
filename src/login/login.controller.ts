import { Controller,Post,Body } from '@nestjs/common';
import {UserService} from '@service/user.service'

@Controller('login')
export class LoginController {
    constructor(private readonly userService: UserService) {}
    @Post()
    async login(
        @Body("account") account:string,
        @Body("password") password:string,
    ){
        const generatedUserId = await this.userService.login(
            account,
            password,
        );
        return { id: generatedUserId };        
    }
}
 