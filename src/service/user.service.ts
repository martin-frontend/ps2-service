import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ) {}
    async insertUser(account: string, password: string) {
        const newUser = new this.userModel({
          account,
          password
        });
        const result = await newUser.save();
        return result.id as string;
    }
    async getUsers(){
        const users = await this.userModel.find().exec();
        return users.map(user => ({
          id: user.id,
          account: user.account,
          password: user.password,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }));
    }
    async updateUser(
        userId:string,
        account: string,
        password: string,
      ) {
        const updatedProduct = await this.findUser(userId);
        if (account) {
          updatedProduct.account = account;
        }
        if (password) {
          updatedProduct.password = password;
        }
        updatedProduct.save();
    }

    async deleteUser(userId: string) {
        const result = await this.userModel.deleteOne({_id: userId}).exec();
        if (result.n === 0) {
          throw new NotFoundException('Could not find product.');
        }
    }

    private async findUser(id: string): Promise<User> {
        let user;
        try {
            user = await this.userModel.findById(id).exec();
        } catch (error) {
          throw new NotFoundException('Could not find user.');
        }
        if (!user) {
          throw new NotFoundException('Could not find user.');
        }
        return user;
    }

}
