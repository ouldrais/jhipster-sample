import { IResourcePlan, NewResourcePlan } from './resource-plan.model';

export const sampleWithRequiredData: IResourcePlan = {
  id: 13171,
};

export const sampleWithPartialData: IResourcePlan = {
  id: 25022,
  availability: true,
};

export const sampleWithFullData: IResourcePlan = {
  id: 24621,
  availability: true,
};

export const sampleWithNewData: NewResourcePlan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
