import { Body, Controller, Get, Post,Request,UseInterceptors,UseGuards } from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';
import { UserService } from '@service/user.service'
import { AuthService } from '@service/auth.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

import { MyResponseDTO } from './dto/get-permission.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        private readonly authService: AuthService) {}
    @Post('/createUser')
    @UseInterceptors(FileInterceptor('body'))
    async addUser(
        @Body() body,
    ){
        const res = await this.userService.createUser(
            body.account,
            body.password,
            body.status,
            body.roleId,
        );
        switch(res){
            case 0:
                return {"success":true,"content":null,"msg":"新增成功"}
            case 1:
                return {"success":false,"content":null,"msg":"新增失敗"}
            case 2:
                return {"success":false,"content":null,"msg":"新增失敗,帳號重複"}
            default:
                // error handler
        }
    }
    @Get('/getUser')
    // @UseGuards(new AuthGuard())
    async getUser(){
        const users = await this.userService.getUsers();
        // fix coding style
        if(users){
            return {"success":true,"content":users,"msg":"搜尋成功"}
        }else{
            return {"success":false,"content":null,"msg":"查無資料"}
        }
    }
    @Post('/updateuser')
    @UseInterceptors(FileInterceptor('body'))
    async updateUser(
        @Body() body,
    ){
        const users = await this.userService.updateUser(body.id, body.account, body.password,body.status,body.roleId);
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
        const users = await this.userService.deleteUser(body.id);
        //TDD
        // if (!users) {
        //     return new ExceptionsHandler();
        // }
        if(users){
            return {"success":true,"content":null,"msg":"刪除成功"}
        }else{
            return {"success":false,"content":null,"msg":"刪除失敗"}
        }
    }
    @Get('/getinfo')  
    async getinfo(@Request() req){

        const validateUser:any = await this.authService.validateUser(req.cookies.AuthCookie)
        if(validateUser !== null){
            const user = await this.authService.findUserById(validateUser.id)
            const role = await this.authService.findUserRole(user.roleId)
            return { "success":true, "content":{ role:role.name,roles:role.roles },"msg":"查詢成功"}
        }
        else{
            return {"success":false,"content":null,"msg":"無登入權限"}
        }
        //"查詢帳號資訊,查詢遊戲歷程,查詢新增帳戶,查詢營收付費,查詢活躍帳戶,查詢留存統計,查詢線上公告,查詢帳號停權,查詢發送物品,查詢活動序號,查詢管理帳號,修改權限設定,查詢權限設定,修改管理帳號,修改線上公告,修改發送物品,修改活動序號,修改帳號停權"
    }
}
