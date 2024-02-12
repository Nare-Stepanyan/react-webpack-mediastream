import EventEmitter from "../EventEmmiter";
import { TIME_EVENTS } from "../constants";

class TimeProvider {
  time: number = 0;
  eventEmitter: EventEmitter = new EventEmitter();

  setTime(time: number) {
    this.time = time;
    this.eventEmitter.emit(TIME_EVENTS.ON_UPDATE, time);
  }
}

export const timeProvider: TimeProvider = new TimeProvider();
