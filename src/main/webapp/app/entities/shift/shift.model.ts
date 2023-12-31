import dayjs from 'dayjs/esm';
import { ITeamPlan } from 'app/entities/team-plan/team-plan.model';
import { IShiftDemand } from 'app/entities/shift-demand/shift-demand.model';
import { IResourcePlan } from 'app/entities/resource-plan/resource-plan.model';

export interface IShift {
  id: number;
  key?: number | null;
  shiftStart?: dayjs.Dayjs | null;
  shiftEnd?: dayjs.Dayjs | null;
  type?: string | null;
  teamPlan?: ITeamPlan | null;
  shiftDemand?: IShiftDemand | null;
  resourcePlan?: IResourcePlan | null;
}

export type NewShift = Omit<IShift, 'id'> & { id: null };
