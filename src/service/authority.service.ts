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
          roleLevel:role.roleLevel,
          name: role.name
        }));
    }
    async updateRole(
        id: string,
        name:string,
        roles: string,
      ) {
        const Role = await this.findRole(id);
        if(Role){
          if (name) {
            Role.name = name;
          }
          if (roles) {
            Role.roles = roles;
          }
          Role.save();
          return true;
        }
        else{
          return false;
        }
    }
    async deleteRole(id: string) {
        const result = await this.authorityRolesModel.deleteOne({_id: id}).exec();
        if (result.n === 0) {
          return false;
        }
        else{
          return true;
        }
    }    
    async findRole(id: string): Promise<AuthorityRoles> {
        let role;
        try {
            role = await this.authorityRolesModel.findById(id).exec();
        } catch (error) {
          throw new NotFoundException('Could not find role.');
        }
        if (!role) {
          throw new NotFoundException('Could not find role.');
        }
        return role;
      }
}
