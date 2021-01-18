import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { eventSchema,EventName } from './event.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventName, schema: eventSchema },
    ])
  ],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
