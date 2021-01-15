import { GetOperationBanDTO } from './dto/ban/get-operation-ban.dto';
import { AnalysisUserLogModel, AnalysisUserLogName } from 'src/analysis/analysisUserLog.model';
import { UpdateOperationCategoryDTO } from './dto/category/update-operation-category.dto';
import { DeleteOperationAnnounceDTO } from './dto/announce/delete-operation-announce.dto';
import { UpdateOperationAnnounceDTO } from './dto/announce/update-operation-announce.dto';
import { OperationAnnounceModel,AnnounceName } from './operationAnnounce.model';
import { OperationBanModel,BanName } from './operationBan.model';
import { OperationCategoryModel,CategoryName } from './operationCategory.model';
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
    @InjectModel(CategoryName)
    private readonly operationCategoryModel: Model<OperationCategoryModel>,
    @InjectModel(AnalysisUserLogName)
    private readonly analysisUserLogModel: Model<AnalysisUserLogModel>,
  ) {}

  async createBan(createOperationBanDTO: CreateOperationBanDTO) {
    //暫時這樣寫，之後要改
    const {account,releaseDate,releaseState,reason} = createOperationBanDTO
    let accountArr = account.split(',')
    let res = null;
    const now = moment().valueOf()
    let remainArr = []
    let _reason = reason?reason:''
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
        let newBan = new this.operationBanModel({account:element,releaseDate:date,releaseState,_reason});
        res = await newBan.save();
        const newLog = new this.analysisUserLogModel({ userAccount: element });
        newLog.logText = this.IsBan(newBan)?"停權":"復權"
        await newLog.save();
      }
    }
    if(res){
      return {created:true,content:remainArr}
    }
    else{
      return {created:false,content:remainArr}
    }
  }
  private IsBan(ban:OperationBanModel){
    const now = moment().valueOf()
    return ban.releaseDate>now||ban.releaseState==='1'
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
      const newLog = new this.analysisUserLogModel({ userAccount: ban.account });
      newLog.logText = this.IsBan(ban)?"停權":"復權"
      await newLog.save();
    }
    return res;
  }
  async getBans(getOperationBanDTO:GetOperationBanDTO) {
    const {page,pageSize} = getOperationBanDTO
    let _pageSize = Number(pageSize)
    let _page = (Number(page) - 1) * Number(pageSize)
    const Bans = await this.operationBanModel.find({}).limit(_pageSize).skip(_page).sort({releaseDate:1})
    let data = Bans.map((ban) => ({
      id: ban.id,
      account:ban.account,
      releaseDate:ban.releaseDate,
      releaseState:ban.releaseState,
      reason:ban.reason,
      isbanned:this.IsBan(ban)
    }));
    const total = await this.operationBanModel.count({})
    return {data:data,total:total};
  }
  async getBansList() {
    const now = moment().valueOf()
    const Bans = await this.operationBanModel.find({
      $or:[
        {releaseDate:{$gte:now}},
        {releaseState:{$eq:'1'}}
      ]      
    })
    let data = Bans.map((ban) => ({
      id: ban.id,
      account:ban.account,
      releaseDate:ban.releaseDate,
      releaseState:ban.releaseState==='1'?'永久停權':'停權',
      reason:ban.reason,
    }));
    return data;
  }

  async createAnnounce(data){
    const newAnnounceModel = new this.operationAnnounceModel(data);
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
  async getAnnouncesList() {
    let now = moment().valueOf();
    const Announces = await this.operationAnnounceModel.find({$and:[
      {onsaleDate:{$lte:now}},
      {nosaleDate:{$gte:now}}
    ]})    
    return Announces.map((announce) => ({
      id: announce.id,
      title:announce.title,
      category:announce.category,
      onsaleDate:announce.onsaleDate,
      nosaleDate:announce.nosaleDate,
      content:announce.content,
      creator:announce.creator,
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
  async getAnnounceCategory() {
    const Category = await this.operationCategoryModel.find({})
    if(Category.length > 0) {
      return Category[0].category
    }
    return Category
  }
  async updateAnnounceCategory(updateOperationCategoryDTO: UpdateOperationCategoryDTO) {
    const haveCategory = await this.operationCategoryModel.find({})
    console.log(haveCategory);
    if(haveCategory.length === 0) {
      const category = new this.operationCategoryModel(updateOperationCategoryDTO);
      const result = await category.save();
      return result
    }else {
      const haveCategoryId = haveCategory[0]._id
      const category = await this.operationCategoryModel.findById({ _id: haveCategoryId }).exec();
      category.category = updateOperationCategoryDTO.category
      const result = await category.save();
      return result
    }
  }
}
