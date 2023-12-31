import { IPositionRequirement } from 'app/entities/position-requirement/position-requirement.model';
import { IResourceTraining } from 'app/entities/resource-training/resource-training.model';

export interface ITraining {
  key?: number | null;
  id: number;
  description?: string | null;
  positionRequirement?: IPositionRequirement | null;
  resourceTraining?: IResourceTraining | null;
}

export type NewTraining = Omit<ITraining, 'id'> & { id: null };
