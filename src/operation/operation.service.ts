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
    const {account,releaseDate,releaseState,whiteState,reason} = createOperationBanDTO
    let accountArr = account.split(',')
    let res = null;
    if(whiteState==='0'){
      const now = moment().valueOf()
      const Bans = await this.operationBanModel.find(
        {
          $and:[
            {account:account},
            {$or:[
              {releaseDate:{$gte:now}},
              {releaseState:{$eq:'1'}}]
            }
          ]
        }
      )
      if(Bans.length){
        return [false,Bans];
      }
    }
    for (let i = 0; i < accountArr.length; i++) {
      let element = accountArr[i];
      let date = releaseDate?Number(releaseDate):0;
      let newBan = new this.operationBanModel({account:element,releaseDate:date,releaseState,reason});
      res = await newBan.save();      
    }
    return [true,res];
  }
  async updateBan(updateOperationBanDTO: UpdateOperationBanDTO) {
    const { id,releaseDate,releaseState } = updateOperationBanDTO;
    const ban = await this.operationBanModel.findById(id).exec();
    if (!ban) throw new NotFoundException();
    ban.releaseDate = Number(releaseDate);
    ban.releaseState = releaseState;
    const res = ban.save();
    return res;
  }
  async getBans() {
    const now = moment().valueOf()
    const Bans = await this.operationBanModel.find({})
    return Bans.map((ban) => ({
      id: ban.id,
      account:ban.account,
      releaseDate:ban.releaseDate,
      releaseState:ban.releaseState,
      reason:ban.reason,
      isbaned:ban.releaseDate>now||ban.releaseState==='1'
    }));
  }
}
