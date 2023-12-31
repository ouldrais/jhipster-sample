import { IRegion, NewRegion } from './region.model';

export const sampleWithRequiredData: IRegion = {
  id: 6896,
};

export const sampleWithPartialData: IRegion = {
  id: 16236,
};

export const sampleWithFullData: IRegion = {
  id: 127,
  regionName: 'introduce',
};

export const sampleWithNewData: NewRegion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
