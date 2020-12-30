import { Controller,Post,Body } from '@nestjs/common';
import { AuthService } from '@service/auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('auth/createToken')
    async createToken(
        @Body("id") id:string,
    ){
        const generatedtoken = await this.authService.createToken(id);
        return { token_data: generatedtoken };        
    }
    @Post('auth/validate')
    async validate(
        @Body("token") token:string,
    ){
        const isValidate = await this.authService.validate(token);
        return { isValidate: isValidate };        
    }
}
 