import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPosition, NewPosition } from '../position.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPosition for edit and NewPositionFormGroupInput for create.
 */
type PositionFormGroupInput = IPosition | PartialWithRequiredKeyOf<NewPosition>;

type PositionFormDefaults = Pick<NewPosition, 'id'>;

type PositionFormGroupContent = {
  key: FormControl<IPosition['key']>;
  id: FormControl<IPosition['id'] | NewPosition['id']>;
  leadership: FormControl<IPosition['leadership']>;
  positionRequirement: FormControl<IPosition['positionRequirement']>;
  resourcePlan: FormControl<IPosition['resourcePlan']>;
};

export type PositionFormGroup = FormGroup<PositionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PositionFormService {
  createPositionFormGroup(position: PositionFormGroupInput = { id: null }): PositionFormGroup {
    const positionRawValue = {
      ...this.getFormDefaults(),
      ...position,
    };
    return new FormGroup<PositionFormGroupContent>({
      key: new FormControl(positionRawValue.key),
      id: new FormControl(
        { value: positionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      leadership: new FormControl(positionRawValue.leadership),
      positionRequirement: new FormControl(positionRawValue.positionRequirement),
      resourcePlan: new FormControl(positionRawValue.resourcePlan),
    });
  }

  getPosition(form: PositionFormGroup): IPosition | NewPosition {
    return form.getRawValue() as IPosition | NewPosition;
  }

  resetForm(form: PositionFormGroup, position: PositionFormGroupInput): void {
    const positionRawValue = { ...this.getFormDefaults(), ...position };
    form.reset(
      {
        ...positionRawValue,
        id: { value: positionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): PositionFormDefaults {
    return {
      id: null,
    };
  }
}
