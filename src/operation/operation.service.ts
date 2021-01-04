import { InjectModel } from '@nestjs/mongoose';
import { OperationBanModel } from './operationBan.model';
import { CreateOperationBanDTO } from './dto/ban/create-operation-ban.dto';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class OperationService {
    constructor(
        @InjectModel('OperationBan') private readonly operationBanModel: Model<OperationBanModel>,
    ) {}
    async createBan(createOperationBanDTO:CreateOperationBanDTO) {
        const newBan = new this.operationBanModel(createOperationBanDTO);
        const res = await newBan.save();
        return res;
    }
}
