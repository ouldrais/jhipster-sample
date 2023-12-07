import { IJob, NewJob } from './job.model';

export const sampleWithRequiredData: IJob = {
  id: 6016,
};

export const sampleWithPartialData: IJob = {
  id: 8334,
  maxSalary: 14647,
};

export const sampleWithFullData: IJob = {
  id: 32016,
  jobTitle: 'Customer Communications Producer',
  minSalary: 9941,
  maxSalary: 385,
};

export const sampleWithNewData: NewJob = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
