import { DeleteOperationAnnounceDTO } from './dto/announce/delete-operation-announce.dto';
import { UpdateOperationAnnounceDTO } from './dto/announce/update-operation-announce.dto';
import { OperationAnnounceModel,AnnounceName } from './operationAnnounce.model';
import { OperationBanModel,BanName } from './operationBan.model';
import { CreateOperationAnnounceDTO } from './dto/announce/create-operation-announce.dto';
import { UpdateOperationBanDTO } from './dto/ban/update-operation-ban.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOperationBanDTO } from './dto/ban/create-operation-ban.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as moment from 'moment';

@Injectable()
export class OperationService {
  constructor(
    @InjectModel(BanName)
    private readonly operationBanModel: Model<OperationBanModel>,
    @InjectModel(AnnounceName)
    private readonly operationAnnounceModel: Model<OperationAnnounceModel>,
  ) {}
  
  async createBan(createOperationBanDTO: CreateOperationBanDTO) {
    //暫時這樣寫，之後要改
    const {account,releaseDate,releaseState,reason} = createOperationBanDTO
    let accountArr = account.split(',')
    let res = null;
    const now = moment().valueOf()
    let remainArr = []
    for (let i = 0; i < accountArr.length; i++) {
      let element = accountArr[i];
      let Ban = await this.operationBanModel.findOne(
        {
          $and:[
            {account:element},
            {$or:[
              {releaseDate:{$gte:now}},
              {releaseState:{$eq:'1'}}
              ]
            }
          ]
        }
      )
      if(Ban){
        remainArr.push(Ban)
      }
      else{
        let date = releaseDate?Number(releaseDate):9999999999999.0;
        let newBan = new this.operationBanModel({account:element,releaseDate:date,releaseState,reason});
        res = await newBan.save();
      }
    }
    if(res){
      return {created:true,content:remainArr}
    }
    else{
      return {created:false,content:remainArr}
    }
  }
  async updateBan(updateOperationBanDTO: UpdateOperationBanDTO) {
    const { id,releaseDate,releaseState,reason } = updateOperationBanDTO;
    let idArr = id.split(',')
    let res = null
    for (let i = 0; i < idArr.length; i++) {
      let ban = await this.operationBanModel.findById(id).exec();
      if (!ban) throw new NotFoundException();
      ban.releaseDate = Number(releaseDate);
      ban.releaseState = releaseState;
      if(reason)
        ban.reason = reason;
      res = ban.save();
    }
    return res;
  }
  async getBans() {
    const now = moment().valueOf()
    const Bans = await this.operationBanModel.find({}).sort({'releaseDate':1})
    return Bans.map((ban) => ({
      id: ban.id,
      account:ban.account,
      releaseDate:ban.releaseDate,
      releaseState:ban.releaseState,
      reason:ban.reason,
      isbaned:ban.releaseDate>now||ban.releaseState==='1'
    }));
  }

  async createAnnounce(createOperationAnnounceDTO:CreateOperationAnnounceDTO){
    const newAnnounceModel = new this.operationAnnounceModel(createOperationAnnounceDTO);
    const result = await newAnnounceModel.save();
    return result;
  }
  async getAnnounces() {
    const Announces = await this.operationAnnounceModel.find({})
    let getStatus = (onsaleDate,nosaleDate)=>{
      let now = moment().valueOf();
      if(now<onsaleDate){
        //未上架
        return '1'
      }
      else if(now>=onsaleDate&&now<=nosaleDate){
        //上架中
        return '2'
      }
      else{
        //已下架
        return '3'
      }
    }
    return Announces.map((announce) => ({
      id: announce.id,
      title:announce.title,
      category:announce.category,
      onsaleDate:announce.onsaleDate,
      nosaleDate:announce.nosaleDate,
      content:announce.content,
      creator:announce.creator,
      status:getStatus(announce.onsaleDate,announce.nosaleDate)      
    }));
  }
  async updateAnnounce(updateOperationAnnounceDTO: UpdateOperationAnnounceDTO) {
    const { id,title,category,onsaleDate,nosaleDate,content } = updateOperationAnnounceDTO;
    const updateAnnounce = await this.operationAnnounceModel.findById(id).exec();
    if (updateAnnounce) {
      if (title) {
        updateAnnounce.title = title;
      }
      if (category) {
        updateAnnounce.category = category;
      }
      if (onsaleDate) {
        updateAnnounce.onsaleDate = Number(onsaleDate);
      }
      if (nosaleDate) {
        updateAnnounce.nosaleDate = Number(nosaleDate);
      }
      if (content) {
        updateAnnounce.content = content;
      }
      updateAnnounce.save();
      return true;
    } else {
      throw new NotFoundException();
    }
  }
  async deleteAnnounce(deleteOperationAnnounceDTO: DeleteOperationAnnounceDTO) {
    const { id } = deleteOperationAnnounceDTO;
    const result = await this.operationAnnounceModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      return false;
    } else {
      return true;
    }
  }
}
