import { ILocation, NewLocation } from './location.model';

export const sampleWithRequiredData: ILocation = {
  id: 8167,
};

export const sampleWithPartialData: ILocation = {
  id: 6920,
  streetAddress: 'running',
  city: 'Talonstad',
  stateProvince: 'below',
};

export const sampleWithFullData: ILocation = {
  id: 18925,
  streetAddress: 'once',
  postalCode: 'but',
  city: 'Oak Park',
  stateProvince: 'next reorganisation quote',
};

export const sampleWithNewData: NewLocation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
