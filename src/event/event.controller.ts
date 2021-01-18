import { EventService } from './event.service';
import { CreateEventDTO } from './dto/create-event.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Post, UseInterceptors, UsePipes, ValidationPipe, Body } from '@nestjs/common';

@ApiTags('event')
@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}
    @Post()
    @ApiOperation({summary:"",description:"新增事件，enent請輸入JSON型態的字串"})
    @UseInterceptors(FileInterceptor('body'))
    @UsePipes(ValidationPipe)
    async createEvent(@Body() createEventDTO:CreateEventDTO) {
        const Event = await this.eventService.createEvent(createEventDTO);
        return Event;    
    }
}
