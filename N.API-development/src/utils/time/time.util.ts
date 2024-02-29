import { DurationInputArg2 } from 'moment/moment';
import * as moment from 'moment';

export class TimeUtil {
  static timeAgo(minutes: number, unit: DurationInputArg2): Date {
    return moment().subtract(minutes, unit).toDate();
  }
}
