import { IResource, NewResource } from './resource.model';

export const sampleWithRequiredData: IResource = {
  id: 31499,
};

export const sampleWithPartialData: IResource = {
  id: 21061,
  firstName: 'Jayda',
  lastName: 'Wolff',
  teamRole: 'pfft hedge foreclose',
};

export const sampleWithFullData: IResource = {
  key: 19828,
  id: 11990,
  firstName: 'Christelle',
  lastName: 'Connelly',
  teamRole: 'meh afore as',
  exchangeAllowed: true,
};

export const sampleWithNewData: NewResource = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
