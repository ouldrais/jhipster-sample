import dayjs from 'dayjs/esm';

import { IShiftTemplate, NewShiftTemplate } from './shift-template.model';

export const sampleWithRequiredData: IShiftTemplate = {
  id: 25308,
};

export const sampleWithPartialData: IShiftTemplate = {
  id: 11838,
  key: 7772,
  shiftEnd: dayjs('2023-12-06T12:14'),
  type: 'siding per',
};

export const sampleWithFullData: IShiftTemplate = {
  id: 14631,
  key: 14366,
  shiftStart: dayjs('2023-12-06T20:16'),
  shiftEnd: dayjs('2023-12-06T20:10'),
  type: 'until softly',
};

export const sampleWithNewData: NewShiftTemplate = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
