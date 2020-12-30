import { Body, Controller, Get, Post, Patch,Delete, UseGuards,UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';
import { UserService } from '@service/user.service'
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post('/createUser')
    @UseInterceptors(FileInterceptor('body'))
    async addUser(
        @Body() body,
    ){
        const generatedUserId = await this.userService.createUser(
            body.account,
            body.password,
        );
        if(generatedUserId){
            return {"success":true,"content":null,"msg":"新增成功"}
        }else{
            return {"success":false,"content":null,"msg":"新增失敗"}
        }
    }
    @Get('/getUser')
    // @UseGuards(new AuthGuard())
    async getUser(){
        const users = await this.userService.getUsers();
        if(users){
            return {"success":true,"content":users,"msg":"搜尋成功"}
        }else{
            return {"success":false,"content":null,"msg":"查無資料"}
        }
    }
    @Post('/updateuser')
    @UseInterceptors(FileInterceptor('body'))
    async updateUser(
        @Body() body
    ){
        const users = await this.userService.updateUser(body.id, body.account, body.password);
        if(users){
            return {"success":true,"content":null,"msg":"更新成功"}
        }else{
            return {"success":false,"content":null,"msg":"更新失敗"}
        }
    }
    @Post('/deleteuser')
    @UseInterceptors(FileInterceptor('body'))
    async deleteUser(
        @Body() body
    ){
        const users = await this.userService.deleteUser(body.id)
        if(users){
            return {"success":true,"content":null,"msg":"刪除成功"}
        }else{
            return {"success":false,"content":null,"msg":"刪除失敗"}
        }
    }
    @Get('/getinfo')
    async getinfo(){
        let roles_str = "查詢帳號資訊,查詢遊戲歷程,查詢新增帳戶,查詢營收付費,查詢活躍帳戶,查詢留存統計,查詢線上公告,查詢帳號停權,查詢發送物品,查詢活動序號,查詢管理帳號,修改權限設定,查詢權限設定,修改管理帳號,修改線上公告,修改發送物品,修改活動序號,修改帳號停權"
        return {"success":true,"content":{role:"超級管理員",roles:roles_str},"msg":"查詢成功"}
    }
}
