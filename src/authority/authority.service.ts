import { GetRoleDTO } from './dto/get-role.dto';
import { DeleteRoleDTO } from './dto/delete-role.dto';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { CreateRoleDTO } from './dto/create-role.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthorityRoles,RolesName } from 'src/authority/authorityRoles.model';

@Injectable()
export class AuthorityService {
  constructor(
    @InjectModel(RolesName)
    private readonly authorityRolesModel: Model<AuthorityRoles>,
  ) {}
  async createRole(createRoleDTO: CreateRoleDTO) {
    const newAuthRolesModel = new this.authorityRolesModel(createRoleDTO);
    const result = await newAuthRolesModel.save();
    return result.id as string;
  }
  async getRole(getRoleDTO:GetRoleDTO) {
    const {page,pageSize} = getRoleDTO
    let _pageSize = Number(pageSize)
    let _page = (Number(page) - 1) * Number(pageSize)
    const roles = await this.authorityRolesModel.find({}).limit(_pageSize).skip(_page).sort({createdAt:1})
    const data = roles.map((role) => ({
      id: role.id,
      roles: role.roles,
      roleLevel: role.roleLevel,
      name: role.name,
    }));
    const total = await this.authorityRolesModel.count({})    
    return {data:data,total:total};
  }
  async updateRole(updateRoleDTO: UpdateRoleDTO) {
    const { id, name, roles } = updateRoleDTO;
    const role = await this.findRole(id);
    if (!role) throw new NotFoundException();
    else {
      if (name) {
        role.name = name;
      }
      if (roles) {
        role.roles = roles;
      }
      role.save();
      return true;
    }
  }
  async deleteRole(deleteRoleDTO: DeleteRoleDTO) {
    const { id } = deleteRoleDTO;
    const result = await this.authorityRolesModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      return false;
    } else {
      return true;
    }
  }
  async findRole(id: string): Promise<AuthorityRoles> {
    const role = await this.authorityRolesModel.findById(id).exec();
    if (!role) {
      throw new NotFoundException();
    }
    return role;
  }
}
