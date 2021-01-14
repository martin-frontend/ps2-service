import { DeleteUserDTO } from './dto/delete-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseInterceptors,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'


@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Post('/createUser')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('body'))
  async addUser(@Body() createUserDTO: CreateUserDTO) {
    const res = await this.userService.createUser(createUserDTO);
    switch (res) {
      case 0:
        return { success: true, content: null, msg: '新增成功' };
      case 1:
        return { success: false, content: null, msg: '新增失敗' };
      case 2:
        return { success: false, content: null, msg: '新增失敗,帳號重複' };
      default:
      // error handler
    }
  }
  @Get('/getUser')
  // @UseGuards(new AuthGuard())
  async getUser() {
    const users = await this.userService.getUsers();
    // fix coding style
    if (users) {
      return { success: true, content: users, msg: '搜尋成功' };
    } else {
      return { success: false, content: null, msg: '查無資料' };
    }
  }
  @Put('/user')
  @UseInterceptors(FileInterceptor('body'))
  @UsePipes(ValidationPipe)
  async updateUser(@Body() updateUserDTO: UpdateUserDTO) {
    const users = await this.userService.updateUser(updateUserDTO);
    if (users) {
      return { success: true, content: null, msg: '更新成功' };
    } else {
      return { success: false, content: null, msg: '更新失敗' };
    }
  }

  @Delete('/user')
  @UseInterceptors(FileInterceptor('body'))
  @UsePipes(ValidationPipe)
  async deleteUser(@Body() deleteUserDTO: DeleteUserDTO) {
    const users = await this.userService.deleteUser(deleteUserDTO);
    //TDD
    // if (!users) {
    //     return new ExceptionsHandler();
    // }
    if (users) {
      return { success: true, content: null, msg: '刪除成功' };
    } else {
      return { success: false, content: null, msg: '刪除失敗' };
    }
  }

  @Get('/getinfo')
  async getinfo(@Request() req) {
    const validateUser: any = await this.authService.validateUser(
      req.query.token,
    );
    if (validateUser !== null) {
      const user = await this.authService.findUserById(validateUser.id);
      const role = await this.authService.findUserRole(user.roleId);
      console.log(role);
      
      if (user.status)
        return {
          success: true,
          content: { role: role.name, roles: role.roles },
          msg: '查詢成功',
        };
    }
    return { success: false, content: null, msg: '無登入權限' };
  }
}
