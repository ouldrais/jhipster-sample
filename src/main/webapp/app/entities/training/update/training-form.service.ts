import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITraining, NewTraining } from '../training.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITraining for edit and NewTrainingFormGroupInput for create.
 */
type TrainingFormGroupInput = ITraining | PartialWithRequiredKeyOf<NewTraining>;

type TrainingFormDefaults = Pick<NewTraining, 'id'>;

type TrainingFormGroupContent = {
  key: FormControl<ITraining['key']>;
  id: FormControl<ITraining['id'] | NewTraining['id']>;
  description: FormControl<ITraining['description']>;
  positionRequirement: FormControl<ITraining['positionRequirement']>;
  resourceTraining: FormControl<ITraining['resourceTraining']>;
};

export type TrainingFormGroup = FormGroup<TrainingFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TrainingFormService {
  createTrainingFormGroup(training: TrainingFormGroupInput = { id: null }): TrainingFormGroup {
    const trainingRawValue = {
      ...this.getFormDefaults(),
      ...training,
    };
    return new FormGroup<TrainingFormGroupContent>({
      key: new FormControl(trainingRawValue.key),
      id: new FormControl(
        { value: trainingRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      description: new FormControl(trainingRawValue.description),
      positionRequirement: new FormControl(trainingRawValue.positionRequirement),
      resourceTraining: new FormControl(trainingRawValue.resourceTraining),
    });
  }

  getTraining(form: TrainingFormGroup): ITraining | NewTraining {
    return form.getRawValue() as ITraining | NewTraining;
  }

  resetForm(form: TrainingFormGroup, training: TrainingFormGroupInput): void {
    const trainingRawValue = { ...this.getFormDefaults(), ...training };
    form.reset(
      {
        ...trainingRawValue,
        id: { value: trainingRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TrainingFormDefaults {
    return {
      id: null,
    };
  }
}
