import { Body, Controller, Get, Post, Patch,Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';
import { UserService } from '@service/user.service'
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    async addUser(
        @Body("account") account:string,
        @Body("password") password:string,
    ){
        const generatedUserId = await this.userService.insertUser(
            account,
            password,
        );
        return { id: generatedUserId };        
    }
    @Get()
    @UseGuards(new AuthGuard())
    async getUser(){
        const users = await this.userService.getUsers();
        return users;
    }    
    @Patch()
    async updateUser(
        @Body('id') userId: string,
        @Body("account") account:string,
        @Body("password") password:string,
    ){
        await this.userService.updateUser(userId, account, password);
        return null;
    }
    @Delete()
    async deleteUser(
        @Body('id') userId:string
    ){
        await this.userService.deleteUser(userId)
        return null;
    }
}
