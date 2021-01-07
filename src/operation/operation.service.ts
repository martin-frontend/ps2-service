import { UpdateOperationBanDTO } from './dto/ban/update-operation-ban.dto';
import { InjectModel } from '@nestjs/mongoose';
import { OperationBanModel } from './operationBan.model';
import { CreateOperationBanDTO } from './dto/ban/create-operation-ban.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as moment from 'moment';

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
    console.log(new Date(releaseDate))
    for (let i = 0; i < accountArr.length; i++) {
      let element = accountArr[i];
      let date = new Date(releaseDate)
      let newBan = new this.operationBanModel({account:element,releaseDate:date,state,reason});
      res = await newBan.save();      
    }
    return res;
  }
  async updateBan(updateOperationBanDTO: UpdateOperationBanDTO) {
    const { id,releaseDate } = updateOperationBanDTO;
    const ban = await this.operationBanModel.findById(id).exec();
    if (!ban) throw new NotFoundException();
    ban.releaseDate = new Date(releaseDate);
    const res = ban.save();
    return res;
  }
  async getBans() {
    const today = new Date();
    const Bans = await this.operationBanModel.find({
      releaseDate:{$gte:today}
    })
    console.log(Bans)
    return Bans.map((ban) => ({
      id: ban.id,
      account:ban.account,
      releaseDate:moment(new Date(ban.releaseDate)).format(
        'YYYY/MM/DD hh:mm:ss',
      ),
      reason:ban.reason
    }));
  }
}
