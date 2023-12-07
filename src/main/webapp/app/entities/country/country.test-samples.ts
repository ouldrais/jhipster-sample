import { ICountry, NewCountry } from './country.model';

export const sampleWithRequiredData: ICountry = {
  id: 16517,
};

export const sampleWithPartialData: ICountry = {
  id: 1896,
  countryName: 'calm',
};

export const sampleWithFullData: ICountry = {
  id: 29343,
  countryName: 'including the dilute',
};

export const sampleWithNewData: NewCountry = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
