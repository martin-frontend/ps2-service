import { ApiTags } from '@nestjs/swagger';
import { DeleteRoleDTO } from './dto/delete-role.dto';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { CreateRoleDTO } from './dto/create-role.dto';
import {
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { AuthorityService } from 'src/authority/authority.service';
import { UserService } from 'src/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('authority')
@Controller('authority')
export class AuthorityController {
  constructor(
    private readonly authService: AuthorityService,
    private readonly userService: UserService,
  ) {}

  @Post('/role')
  @UseInterceptors(FileInterceptor('body'))
  @UsePipes(ValidationPipe)
  async createRole(@Body() createRoleDTO: CreateRoleDTO) {
    const Roles = await this.authService.createRole(createRoleDTO);
    if (Roles) {
      return { success: true, content: null, msg: '新增成功' };
    } else {
      return { success: false, content: null, msg: '新增失敗' };
    }
  }
  @Get('/role')
  @UsePipes(ValidationPipe)
  async getRole() {
    const Roles = await this.authService.getRole();
    if (Roles) {
      return { success: true, content: Roles, msg: '查詢成功' };
    } else {
      return { success: false, content: null, msg: '查無資料' };
    }
  }

  @Put('/role')
  @UseInterceptors(FileInterceptor('body'))
  @UsePipes(ValidationPipe)
  async updateRole(@Body() updateRoleDTO: UpdateRoleDTO) {
    const Roles = await this.authService.updateRole(updateRoleDTO);
    if (Roles) {
      return { success: true, content: null, msg: '更新成功' };
    } else {
      return { success: false, content: null, msg: '更新失敗' };
    }
  }

  @Delete('/role')
  @UseInterceptors(FileInterceptor('body'))
  @UsePipes(ValidationPipe)
  async deleteRole(@Body() deleteRoleDTO: DeleteRoleDTO) {
    const { id } = deleteRoleDTO;
    const user = await this.userService.findUser({ roleId: id });
    if (user) {
      return {
        success: false,
        content: null,
        msg: '尚有使用者使用此權限，刪除失敗',
      };
    } else {
      const Role = await this.authService.deleteRole(deleteRoleDTO);
      if (Role) return { success: true, content: null, msg: '刪除成功' };
      else return { success: false, content: null, msg: '刪除失敗' };
    }
  }
}
