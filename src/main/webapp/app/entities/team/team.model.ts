import { IResource } from 'app/entities/resource/resource.model';
import { ITeamPlan } from 'app/entities/team-plan/team-plan.model';

export interface ITeam {
  key?: number | null;
  id: number;
  resource?: IResource | null;
  teamPlan?: ITeamPlan | null;
}

export type NewTeam = Omit<ITeam, 'id'> & { id: null };
