import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 28975,
};

export const sampleWithPartialData: IDepartment = {
  key: 27129,
  id: 3335,
  team: 'screening slight underperform',
};

export const sampleWithFullData: IDepartment = {
  key: 1593,
  id: 30935,
  team: 'doting keen',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
