import { UpdateOperationBanDTO } from './dto/ban/update-operation-ban.dto';
import { InjectModel } from '@nestjs/mongoose';
import { OperationBanModel } from './operationBan.model';
import { CreateOperationBanDTO } from './dto/ban/create-operation-ban.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class OperationService {
  constructor(
    @InjectModel('OperationBan')
    private readonly operationBanModel: Model<OperationBanModel>,
  ) {}
  
  async createBan(createOperationBanDTO: CreateOperationBanDTO) {
    //暫時這樣寫，之後要改
    const {account,releaseDate,state,reason} = createOperationBanDTO
    let accountArr = account.split(',')
    let res = null;
    for (let i = 0; i < accountArr.length; i++) {
      let element = accountArr[i];
      let newBan = new this.operationBanModel({account:element,releaseDate,state,reason});
      res = await newBan.save();      
    }
    return res;
  }
  async updateBan(updateOperationBanDTO: UpdateOperationBanDTO) {
    const { id,releaseDate } = updateOperationBanDTO;
    const ban = await this.operationBanModel.findById(id).exec();
    if (!ban) throw new NotFoundException();
    ban.releaseDate = Number(releaseDate);
    const res = ban.save();
    return res;
  }
  async getBans() {
    const today = new Date().getDate();
    const Bans = await this.operationBanModel.find({
      releaseDate:{$gte:today}
    })
    return Bans.map((ban) => ({
      id: ban.id,
      account:ban.account,
      releaseDate:ban.releaseDate,
      reason:ban.reason
    }));
  }
}
