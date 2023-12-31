import { IPositionRequirement } from 'app/entities/position-requirement/position-requirement.model';
import { IResourcePlan } from 'app/entities/resource-plan/resource-plan.model';
import { IDepartment } from 'app/entities/department/department.model';

export interface IPosition {
  key?: number | null;
  id: number;
  leadership?: string | null;
  positionRequirement?: IPositionRequirement | null;
  resourcePlan?: IResourcePlan | null;
  department?: IDepartment | null;
}

export type NewPosition = Omit<IPosition, 'id'> & { id: null };
