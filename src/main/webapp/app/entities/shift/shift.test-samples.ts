import dayjs from 'dayjs/esm';

import { IShift, NewShift } from './shift.model';

export const sampleWithRequiredData: IShift = {
  id: 24369,
};

export const sampleWithPartialData: IShift = {
  id: 24376,
  shiftStart: dayjs('2023-12-06T09:13'),
  shiftEnd: dayjs('2023-12-06T11:32'),
};

export const sampleWithFullData: IShift = {
  id: 14093,
  key: 21856,
  shiftStart: dayjs('2023-12-06T06:19'),
  shiftEnd: dayjs('2023-12-06T22:21'),
  type: 'yew trigonometry',
};

export const sampleWithNewData: NewShift = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
