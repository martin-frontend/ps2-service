import { Controller,Post,Get,Body,UseInterceptors } from '@nestjs/common';
import {AuthorityService} from '@service/authority.service'
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('authority')
export class AuthorityController {
    constructor(private readonly authService: AuthorityService) {}
    @Post('/createrole')
    @UseInterceptors(FileInterceptor('body'))
    async createRole(
        @Body() body
    ){
        const Roles = await this.authService.createRole(
            body.name,
            body.roles,
        );
        if(Roles){
            return {"success":true,"content":null,"msg":"新增成功"}
        }else{
            return {"success":false,"content":null,"msg":"新增失敗"}
        }
    }
    @Get('/getrole')
    async getRole(){
        const Roles = await this.authService.getRole();
        if(Roles){
            return {"success":true,"content":Roles,"msg":"查詢成功"}
        }else{
            return {"success":false,"content":null,"msg":"查無資料"}
        }
    }
    @Post('/updaterole')
    @UseInterceptors(FileInterceptor('body'))
    async updateUser(
        @Body() body
    ){
        const Roles = await this.authService.updateRole(body.id, body.name, body.roles);
        if(Roles){
            return {"success":true,"content":null,"msg":"更新成功"}
        }else{
            return {"success":false,"content":null,"msg":"更新失敗"}
        }
    }
    @Post('/deleterole')
    @UseInterceptors(FileInterceptor('body'))
    async deleteUser(
        @Body() body
    ){
        const Roles = await this.authService.deleteUser(body.id)
        if(Roles){
            return {"success":true,"content":null,"msg":"刪除成功"}
        }else{
            return {"success":false,"content":null,"msg":"刪除失敗"}
        }
    }
}
