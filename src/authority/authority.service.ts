import { DeleteRoleDTO } from './dto/delete-role.dto';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { CreateRoleDTO } from './dto/create-role.dto';
import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthorityRoles } from 'src/authority/authorityRoles.model';

@Injectable()
export class AuthorityService {
    constructor(
        @InjectModel('AuthorityRoles') private readonly authorityRolesModel: Model<AuthorityRoles>,
    ) {}
    async createRole(createRoleDTO:CreateRoleDTO) {
        const {name,roles} = createRoleDTO
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
    async updateRole(updateRoleDTO:UpdateRoleDTO) {
        const {id,name,roles} = updateRoleDTO
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
    async deleteRole(deleteRoleDTO:DeleteRoleDTO) {
        const {id} = deleteRoleDTO;
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
