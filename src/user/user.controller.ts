import { Body, Controller, Get, Post, Patch,Delete } from '@nestjs/common';
import {UserService} from './user.service'
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    async addUser(
        @Body("account") account:string,
        @Body("password") password:string,
        @Body("email") email:string
    ){
        const generatedUserId = await this.userService.insertUser(
            account,
            password,
            email,
        );
        return { id: generatedUserId };        
    }
    @Get()
    async getUser(){
        const users = await this.userService.getUsers();
        return users;
    }    
    @Patch()
    async updateUser(
        @Body('id') userId: string,
        @Body("account") account:string,
        @Body("password") password:string,
        @Body("email") email:string
    ){
        await this.userService.updateUser(userId, account, password, email);
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
