import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthorityRoles } from 'src/model/authorityRoles.model';

@Injectable()
export class AuthorityService {
    constructor(
        @InjectModel('AuthorityRoles') private readonly authorityRolesModel: Model<AuthorityRoles>,
    ) {}
    async createRole(name: string, roles: string) {
        const newAuthRolesModel = new this.authorityRolesModel({
            name,
            roles
        });
        const result = await newAuthRolesModel.save();
        return result.id as string;
    }
    async getRole(){
        const roles = await this.authorityRolesModel.find().exec();
        return roles.map(role => ({
          id: role.id,
          roles: role.roles,
          name: role.name
        }));
    }
}
