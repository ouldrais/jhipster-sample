import { IPosition, NewPosition } from './position.model';

export const sampleWithRequiredData: IPosition = {
  id: 18420,
};

export const sampleWithPartialData: IPosition = {
  id: 889,
};

export const sampleWithFullData: IPosition = {
  key: 4843,
  id: 22286,
  leadership: 'for bunkhouse instead',
};

export const sampleWithNewData: NewPosition = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
