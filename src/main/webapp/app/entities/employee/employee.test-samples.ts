import dayjs from 'dayjs/esm';

import { IEmployee, NewEmployee } from './employee.model';

export const sampleWithRequiredData: IEmployee = {
  id: 12029,
};

export const sampleWithPartialData: IEmployee = {
  id: 20026,
  firstName: 'Christelle',
  lastName: 'Beahan',
  hireDate: dayjs('2023-12-06T17:23'),
  salary: 8339,
  commissionPct: 11056,
};

export const sampleWithFullData: IEmployee = {
  id: 4818,
  firstName: 'Immanuel',
  lastName: 'Wolf',
  email: 'Nick.Towne@hotmail.com',
  phoneNumber: 'mmm stealthily',
  hireDate: dayjs('2023-12-06T15:59'),
  salary: 6574,
  commissionPct: 6896,
};

export const sampleWithNewData: NewEmployee = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
