import { ITeam, NewTeam } from './team.model';

export const sampleWithRequiredData: ITeam = {
  id: 12930,
};

export const sampleWithPartialData: ITeam = {
  key: 11954,
  id: 9756,
};

export const sampleWithFullData: ITeam = {
  key: 10658,
  id: 24704,
};

export const sampleWithNewData: NewTeam = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
