import * as jwt from 'jsonwebtoken';

//暫時，之後需要與user.service合併
import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/model/user.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ) {}

    async createToken(id: string) {
        //token到期時間
        const expiresTime = 60 * 10;
        //重要，盡可能複雜些
        const secret = 'popo';
        
        const token = jwt.sign({ id:id }, secret, { expiresIn: 200 });
        return {
            expires_in: expiresTime,
            token: token
        }
    }
    async validate(token:string): Promise<boolean> {
        const decoded:any = jwt.verify(token, 'popo')
        const user = await this.findUser(decoded.id);
        console.log(user)
        return false;
    }
    // async validate(payload: object): Promise<boolean> {
    //     const user = await this.findUser(payload['ID']);
    //     //有該筆資料，回傳true
    //     if (user) {
    //         return true;
    //     }
    //     //沒該筆資料回傳false
    //     else {
    //         return false;
    //     }
    // }
    async login(account: string,password:string): Promise<User> {
        let user;
        try {
            user = await this.userModel.findOne({
              account:account,
              password:password,
            })
        } catch (error) {
          throw new NotFoundException('Could not find user.');
        }
        if (!user) {
          throw new NotFoundException('Could not find user.');
        }
        return user;
    }   
    async findUser(id: string): Promise<User> {
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
