import { IPosition } from 'app/entities/position/position.model';
import { IShiftDemand } from 'app/entities/shift-demand/shift-demand.model';
import { IJobHistory } from 'app/entities/job-history/job-history.model';

export interface IDepartment {
  key?: number | null;
  id: number;
  team?: string | null;
  position?: IPosition | null;
  shiftDemand?: IShiftDemand | null;
  jobHistory?: IJobHistory | null;
}

export type NewDepartment = Omit<IDepartment, 'id'> & { id: null };
