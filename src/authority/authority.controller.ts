import { Controller,Post,Get,Body,UseInterceptors } from '@nestjs/common';
import {AuthorityService} from 'src/authority/authority.service'
import { UserService } from 'src/user/user.service'
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('authority')
export class AuthorityController {
    constructor(private readonly authService: AuthorityService,
        private readonly userService: UserService) {}
    
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
    async updateRole(
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
    async deleteRole(
        @Body() body
    ){
        const user = await this.userService.findUser({roleId:body.id})        
        if(user){
            return {"success":false,"content":null,"msg":"尚有使用者使用此權限，刪除失敗"}
        }else{
            const Role = await this.authService.deleteRole(body.id)
            if(Role)
                return {"success":true,"content":null,"msg":"刪除成功"}
            else    
                return {"success":false,"content":null,"msg":"刪除失敗"}
        }
    }
}
