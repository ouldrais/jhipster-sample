import { ITask, NewTask } from './task.model';

export const sampleWithRequiredData: ITask = {
  id: 452,
};

export const sampleWithPartialData: ITask = {
  id: 23521,
  description: 'bound shakily',
};

export const sampleWithFullData: ITask = {
  id: 24784,
  title: 'overdraw unabashedly',
  description: 'while',
};

export const sampleWithNewData: NewTask = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
