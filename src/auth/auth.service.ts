import * as jwt from 'jsonwebtoken';

//暫時，之後需要與user.service合併
import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthorityRoles } from 'src/model/authorityRoles.model';
import { User } from 'src/model/user.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('AuthorityRoles') private readonly authorityRolesModel: Model<AuthorityRoles>,
    ) {}

    async createToken(id: string) {
        //token到期時間
        const expiresTime = 3600*6000;
        //重要，盡可能複雜些
        const secret = 'popo';        
        const jwtobj = jwt.sign({ id:id }, secret, { expiresIn: expiresTime });
        return jwtobj
    }
    async validateUser(token:string): Promise<User> {
        if(token){
          const decoded:any = jwt.verify(token, 'popo')
          const user = await this.findUserById(decoded.id);
          return user;
        }else{
          return null;
        }
    }
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
          return null;
        }
        return user;
    }   
    async findUserById(id: string): Promise<User> {
        let user = await this.userModel.findById(id).exec()
        return user;
    }
    async findUserRole(userid: string): Promise<AuthorityRoles> {
      let role = await this.authorityRolesModel.findById(userid)
      return role;
    }

}
