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
    @Get('/getinfo')
    async getinfo(){
        let roles_str = "查詢帳號資訊,查詢遊戲歷程,查詢新增帳戶,查詢營收付費,查詢活躍帳戶,查詢留存統計,查詢線上公告,查詢帳號停權,查詢發送物品,查詢活動序號,查詢管理帳號,修改權限設定,查詢權限設定,修改管理帳號,修改線上公告,修改發送物品,修改活動序號,修改帳號停權"
        return {"success":true,"content":{role:"超級管理員",roles:roles_str},"msg":"查詢成功"}
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
