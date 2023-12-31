import dayjs from 'dayjs/esm';

import { IResourceTraining, NewResourceTraining } from './resource-training.model';

export const sampleWithRequiredData: IResourceTraining = {
  id: 26660,
};

export const sampleWithPartialData: IResourceTraining = {
  id: 9339,
  status: 'hm',
  trainer: 'carefully hence',
  activeFrom: dayjs('2023-12-06T05:33'),
  activeto: dayjs('2023-12-06T17:49'),
};

export const sampleWithFullData: IResourceTraining = {
  id: 1450,
  status: 'soggy amidst preservation',
  level: 'indeed',
  trainer: 'sup mime huzzah',
  activeFrom: dayjs('2023-12-06T23:12'),
  activeto: dayjs('2023-12-06T17:33'),
};

export const sampleWithNewData: NewResourceTraining = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
