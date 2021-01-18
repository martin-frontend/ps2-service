import * as mongoose from 'mongoose';

export const eventSchema = new mongoose.Schema(
  {
    eventId: { type: String, required: true },
    event: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface EventModel extends mongoose.Document {
  id: string;
  eventId: string;
  event: string;
  createdAt: number;
  updatedAt: number;
}

export const EventName = 'Event';
