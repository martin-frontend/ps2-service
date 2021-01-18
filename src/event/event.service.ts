import { EventModel,EventName } from './event.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { Model } from 'mongoose';


@Injectable()
export class EventService {
    constructor(
        @InjectModel(EventName)
        private readonly eventModel: Model<EventModel>,
      ) {}
    async createEvent(data){
        const {eventId,event} = data
        try {
            JSON.parse(event);
            let evevtData = JSON.parse(event)
            const newEventModel = new this.eventModel({eventId:eventId,event:evevtData});
            const result = await newEventModel.save();
            return result;
        } catch (e) {
            throw new UnsupportedMediaTypeException("請輸入正確JSON格式");
        }
    }
}
