import { DeleteUserDTO } from './dto/delete-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.model';
import { AuthorityRoles } from 'src/authority/authorityRoles.model';
import * as moment from 'moment';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('AuthorityRoles')
    private readonly authorityRolesModel: Model<AuthorityRoles>,
  ) {}
  //status
  async createUser(createUserDTO: CreateUserDTO) {
    const { account, password, status, roleId } = createUserDTO;
    const user = await this.userModel.findOne({
      account: account,
    });
    //0:新增成功 1:新增失敗 2:帳號重複
    if (user) {
      return 2;
    } else {
      const newUser = new this.userModel({
        account,
        password,
        status,
        roleId,
      });
      const res = await newUser.save();
      return res ? 0 : 1;
    }
  }
  async getUsers() {
    const users = await this.userModel.find().exec();
    const resArr = [];
    for (let i = 0; i < users.length; i++) {
      const role = await this.authorityRolesModel.findOne({
        _id: users[i].roleId,
      });
      resArr.push({
        id: users[i]._id,
        account: users[i].account,
        password: users[i].password,
        roleId: role._id,
        roleName: role.name,
        roles: role.roles,
        roleLevel: role.roleLevel,
        status: users[i].status,
        createdAt: moment(new Date(users[i].createdAt)).format(
          'YYYY/MM/DD hh:mm:ss',
        ),
        updatedAt: moment(new Date(users[i].updatedAt)).format(
          'YYYY/MM/DD hh:mm:ss',
        ),
      });
    }
    return resArr;
  }
  async updateUser(updateUserDTO: UpdateUserDTO) {
    const { id, account, password, status, roleId } = updateUserDTO;
    const updateUser = await this.findUserById(id);
    if (updateUser) {
      if (account) {
        updateUser.account = account;
      }
      if (password) {
        updateUser.password = password;
      }
      if (status) {
        updateUser.status = status;
      }
      if (roleId) {
        updateUser.roleId = roleId;
      }
      updateUser.save();
      return true;
    } else {
      throw new NotFoundException();
    }
  }
  async deleteUser(deleteUserDTO: DeleteUserDTO) {
    const { id } = deleteUserDTO;
    const res = await this.userModel.deleteOne({ _id: id }).exec();
    if (res.n === 0) {
      return false;
    } else {
      return true;
    }
  }
  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
  async findUser(data: any): Promise<User> {
    const user = await this.userModel.findOne(data).exec();
    return user;
  }
}
