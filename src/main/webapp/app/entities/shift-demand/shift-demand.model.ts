import { IDepartment } from 'app/entities/department/department.model';
import { IShift } from 'app/entities/shift/shift.model';

export interface IShiftDemand {
  id: number;
  count?: number | null;
  department?: IDepartment | null;
  shift?: IShift | null;
}

export type NewShiftDemand = Omit<IShiftDemand, 'id'> & { id: null };
