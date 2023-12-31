import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IResourceTraining } from 'app/entities/resource-training/resource-training.model';
import { ResourceTrainingService } from 'app/entities/resource-training/service/resource-training.service';
import { IResourcePlan } from 'app/entities/resource-plan/resource-plan.model';
import { ResourcePlanService } from 'app/entities/resource-plan/service/resource-plan.service';
import { ResourceService } from '../service/resource.service';
import { IResource } from '../resource.model';
import { ResourceFormService, ResourceFormGroup } from './resource-form.service';

@Component({
  standalone: true,
  selector: 'jhi-resource-update',
  templateUrl: './resource-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ResourceUpdateComponent implements OnInit {
  isSaving = false;
  resource: IResource | null = null;

  resourceTrainingsCollection: IResourceTraining[] = [];
  resourcePlansCollection: IResourcePlan[] = [];

  editForm: ResourceFormGroup = this.resourceFormService.createResourceFormGroup();

  constructor(
    protected resourceService: ResourceService,
    protected resourceFormService: ResourceFormService,
    protected resourceTrainingService: ResourceTrainingService,
    protected resourcePlanService: ResourcePlanService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareResourceTraining = (o1: IResourceTraining | null, o2: IResourceTraining | null): boolean =>
    this.resourceTrainingService.compareResourceTraining(o1, o2);

  compareResourcePlan = (o1: IResourcePlan | null, o2: IResourcePlan | null): boolean =>
    this.resourcePlanService.compareResourcePlan(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ resource }) => {
      this.resource = resource;
      if (resource) {
        this.updateForm(resource);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const resource = this.resourceFormService.getResource(this.editForm);
    if (resource.id !== null) {
      this.subscribeToSaveResponse(this.resourceService.update(resource));
    } else {
      this.subscribeToSaveResponse(this.resourceService.create(resource));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IResource>>): void {
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

  protected updateForm(resource: IResource): void {
    this.resource = resource;
    this.resourceFormService.resetForm(this.editForm, resource);

    this.resourceTrainingsCollection = this.resourceTrainingService.addResourceTrainingToCollectionIfMissing<IResourceTraining>(
      this.resourceTrainingsCollection,
      resource.resourceTraining,
    );
    this.resourcePlansCollection = this.resourcePlanService.addResourcePlanToCollectionIfMissing<IResourcePlan>(
      this.resourcePlansCollection,
      resource.resourcePlan,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.resourceTrainingService
      .query({ filter: 'resource-is-null' })
      .pipe(map((res: HttpResponse<IResourceTraining[]>) => res.body ?? []))
      .pipe(
        map((resourceTrainings: IResourceTraining[]) =>
          this.resourceTrainingService.addResourceTrainingToCollectionIfMissing<IResourceTraining>(
            resourceTrainings,
            this.resource?.resourceTraining,
          ),
        ),
      )
      .subscribe((resourceTrainings: IResourceTraining[]) => (this.resourceTrainingsCollection = resourceTrainings));

    this.resourcePlanService
      .query({ filter: 'resource-is-null' })
      .pipe(map((res: HttpResponse<IResourcePlan[]>) => res.body ?? []))
      .pipe(
        map((resourcePlans: IResourcePlan[]) =>
          this.resourcePlanService.addResourcePlanToCollectionIfMissing<IResourcePlan>(resourcePlans, this.resource?.resourcePlan),
        ),
      )
      .subscribe((resourcePlans: IResourcePlan[]) => (this.resourcePlansCollection = resourcePlans));
  }
}
