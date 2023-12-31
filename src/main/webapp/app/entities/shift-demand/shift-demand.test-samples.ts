import { IShiftDemand, NewShiftDemand } from './shift-demand.model';

export const sampleWithRequiredData: IShiftDemand = {
  id: 10098,
};

export const sampleWithPartialData: IShiftDemand = {
  id: 8740,
  count: 12836,
};

export const sampleWithFullData: IShiftDemand = {
  id: 23919,
  count: 3568,
};

export const sampleWithNewData: NewShiftDemand = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
