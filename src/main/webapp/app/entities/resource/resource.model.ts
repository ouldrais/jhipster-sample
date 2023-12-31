import { IResourceTraining } from 'app/entities/resource-training/resource-training.model';
import { IResourcePlan } from 'app/entities/resource-plan/resource-plan.model';
import { ITeam } from 'app/entities/team/team.model';

export interface IResource {
  key?: number | null;
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  teamRole?: string | null;
  exchangeAllowed?: boolean | null;
  resourceTraining?: IResourceTraining | null;
  resourcePlan?: IResourcePlan | null;
  team?: ITeam | null;
}

export type NewResource = Omit<IResource, 'id'> & { id: null };
