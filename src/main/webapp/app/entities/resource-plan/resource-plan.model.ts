import { IResource } from 'app/entities/resource/resource.model';
import { IPosition } from 'app/entities/position/position.model';
import { IShift } from 'app/entities/shift/shift.model';

export interface IResourcePlan {
  id: number;
  availability?: boolean | null;
  resource?: IResource | null;
  position?: IPosition | null;
  shift?: IShift | null;
}

export type NewResourcePlan = Omit<IResourcePlan, 'id'> & { id: null };
