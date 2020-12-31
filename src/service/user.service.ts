import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/model/user.model';
import { AuthorityRoles } from 'src/model/authorityRoles.model';
import * as moment from 'moment'

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('AuthorityRoles') private readonly authorityRolesModel: Model<AuthorityRoles>,

    ) {}
    //status
    async createUser(account: string, password: string, status:string,role_id:string ) {
        const user = await this.userModel.findOne({
          account:account,
        })
        //0:新增成功 1:新增失敗 2:帳號重複
        if(user){
          return 2;
        }else{
          const newUser = new this.userModel({
            account,
            password,
            status,
            role_id
          });
          const res = await newUser.save();
          return res?0:1;
        }
    }
    async getUsers(){
        const users = await this.userModel.find().exec();       
        let resArr = []
        for (let i = 0; i < users.length; i++) {
          let role = await this.authorityRolesModel.findOne({
            _id:users[i].role_id,
          })
          resArr.push({
            id: users[i].id,
            account: users[i].account,
            password: users[i].password,
            role_id:role.id,
            roleName:role.name,
            roles:role.roles,
            status: users[i].status,
            createdAt: moment(new Date(users[i].createdAt)).format('YYYY/MM/DD hh:mm:ss'),
            updatedAt: moment(new Date(users[i].updatedAt)).format('YYYY/MM/DD hh:mm:ss')
          })          
        }
        return resArr;
    }
    async updateUser(
        userId:string,
        account: string,
        password: string,
        status:string
      ) {
        const updateUser = await this.findUser(userId);
        if(updateUser){
          if (account) {
            updateUser.account = account;
          }
          if (password) {
            updateUser.password = password;
          }
          if (status) {
            updateUser.status = status;
          }
          updateUser.save();
          return true;
        }
        else{
          return false;
        }
    }
    async deleteUser(userId: string) {
        const res = await this.userModel.deleteOne({_id: userId}).exec();
        if (res.n === 0) {
          return false;
        }
        else{
          return true;
        }
    }     
    async findUser(id: string): Promise<User> {
      let user = await this.userModel.findById(id).exec()
      return user;
    }
}
