import { ITeamPlan, NewTeamPlan } from './team-plan.model';

export const sampleWithRequiredData: ITeamPlan = {
  id: 5715,
};

export const sampleWithPartialData: ITeamPlan = {
  id: 10248,
};

export const sampleWithFullData: ITeamPlan = {
  id: 29532,
  availability: false,
};

export const sampleWithNewData: NewTeamPlan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
