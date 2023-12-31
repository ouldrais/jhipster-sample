import { ITraining, NewTraining } from './training.model';

export const sampleWithRequiredData: ITraining = {
  id: 27309,
};

export const sampleWithPartialData: ITraining = {
  id: 893,
  description: 'teeming until',
};

export const sampleWithFullData: ITraining = {
  key: 9462,
  id: 16667,
  description: 'commodity so sign',
};

export const sampleWithNewData: NewTraining = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
