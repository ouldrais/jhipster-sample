import { IPositionRequirement, NewPositionRequirement } from './position-requirement.model';

export const sampleWithRequiredData: IPositionRequirement = {
  id: 18335,
};

export const sampleWithPartialData: IPositionRequirement = {
  id: 1500,
};

export const sampleWithFullData: IPositionRequirement = {
  id: 26513,
  mandatoty: 'importune',
};

export const sampleWithNewData: NewPositionRequirement = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
