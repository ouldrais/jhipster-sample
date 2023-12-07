import dayjs from 'dayjs/esm';

import { IJobHistory, NewJobHistory } from './job-history.model';

export const sampleWithRequiredData: IJobHistory = {
  id: 9396,
};

export const sampleWithPartialData: IJobHistory = {
  id: 6755,
  endDate: dayjs('2023-12-07T03:38'),
  language: 'SPANISH',
};

export const sampleWithFullData: IJobHistory = {
  id: 10080,
  startDate: dayjs('2023-12-06T13:54'),
  endDate: dayjs('2023-12-06T15:27'),
  language: 'FRENCH',
};

export const sampleWithNewData: NewJobHistory = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
