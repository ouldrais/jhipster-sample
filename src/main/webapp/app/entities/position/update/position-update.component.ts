import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IPositionRequirement } from 'app/entities/position-requirement/position-requirement.model';
import { PositionRequirementService } from 'app/entities/position-requirement/service/position-requirement.service';
import { IResourcePlan } from 'app/entities/resource-plan/resource-plan.model';
import { ResourcePlanService } from 'app/entities/resource-plan/service/resource-plan.service';
import { PositionService } from '../service/position.service';
import { IPosition } from '../position.model';
import { PositionFormService, PositionFormGroup } from './position-form.service';

@Component({
  standalone: true,
  selector: 'jhi-position-update',
  templateUrl: './position-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class PositionUpdateComponent implements OnInit {
  isSaving = false;
  position: IPosition | null = null;

  positionRequirementsCollection: IPositionRequirement[] = [];
  resourcePlansCollection: IResourcePlan[] = [];

  editForm: PositionFormGroup = this.positionFormService.createPositionFormGroup();

  constructor(
    protected positionService: PositionService,
    protected positionFormService: PositionFormService,
    protected positionRequirementService: PositionRequirementService,
    protected resourcePlanService: ResourcePlanService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  comparePositionRequirement = (o1: IPositionRequirement | null, o2: IPositionRequirement | null): boolean =>
    this.positionRequirementService.comparePositionRequirement(o1, o2);

  compareResourcePlan = (o1: IResourcePlan | null, o2: IResourcePlan | null): boolean =>
    this.resourcePlanService.compareResourcePlan(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ position }) => {
      this.position = position;
      if (position) {
        this.updateForm(position);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const position = this.positionFormService.getPosition(this.editForm);
    if (position.id !== null) {
      this.subscribeToSaveResponse(this.positionService.update(position));
    } else {
      this.subscribeToSaveResponse(this.positionService.create(position));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPosition>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(position: IPosition): void {
    this.position = position;
    this.positionFormService.resetForm(this.editForm, position);

    this.positionRequirementsCollection = this.positionRequirementService.addPositionRequirementToCollectionIfMissing<IPositionRequirement>(
      this.positionRequirementsCollection,
      position.positionRequirement,
    );
    this.resourcePlansCollection = this.resourcePlanService.addResourcePlanToCollectionIfMissing<IResourcePlan>(
      this.resourcePlansCollection,
      position.resourcePlan,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.positionRequirementService
      .query({ filter: 'position-is-null' })
      .pipe(map((res: HttpResponse<IPositionRequirement[]>) => res.body ?? []))
      .pipe(
        map((positionRequirements: IPositionRequirement[]) =>
          this.positionRequirementService.addPositionRequirementToCollectionIfMissing<IPositionRequirement>(
            positionRequirements,
            this.position?.positionRequirement,
          ),
        ),
      )
      .subscribe((positionRequirements: IPositionRequirement[]) => (this.positionRequirementsCollection = positionRequirements));

    this.resourcePlanService
      .query({ filter: 'position-is-null' })
      .pipe(map((res: HttpResponse<IResourcePlan[]>) => res.body ?? []))
      .pipe(
        map((resourcePlans: IResourcePlan[]) =>
          this.resourcePlanService.addResourcePlanToCollectionIfMissing<IResourcePlan>(resourcePlans, this.position?.resourcePlan),
        ),
      )
      .subscribe((resourcePlans: IResourcePlan[]) => (this.resourcePlansCollection = resourcePlans));
  }
}
