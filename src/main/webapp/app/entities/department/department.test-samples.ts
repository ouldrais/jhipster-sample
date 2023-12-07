import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 603,
  departmentName: 'phooey beneath abnormally',
};

export const sampleWithPartialData: IDepartment = {
  id: 22085,
  departmentName: 'wildly boo',
};

export const sampleWithFullData: IDepartment = {
  id: 25886,
  departmentName: 'oof',
};

export const sampleWithNewData: NewDepartment = {
  departmentName: 'liaise',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
