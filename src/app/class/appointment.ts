import {PersistableEntity} from './persistable-entity';
import {Module} from './module';
import { v4 as uuidv4 } from 'uuid';
import {Moment} from 'moment';
import * as moment from 'moment';

export class Appointment extends PersistableEntity {
  appointmentId: string = uuidv4();
  type: AppointmentType;
  name: string;
  description: string;
  place: string;
  date: number;
  start: number;
  end: number;
  allDay: boolean;
  interval: number;
  moduleId: string;

  getPrimaryId(): string {
    return this.appointmentId;
  }

  getStartAsMoment(): Moment {
    return moment.utc(this.start);
  }

  getEndAsMoment(): Moment {
    return moment.utc(this.end);
  }
}

export enum AppointmentType {
  TIMETABLE,
  LEARNING_PLAN,
  FREE_TIME,
  EXAM
}