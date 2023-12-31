import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IPositionRequirement } from 'app/entities/position-requirement/position-requirement.model';
import { PositionRequirementService } from 'app/entities/position-requirement/service/position-requirement.service';
import { IResourceTraining } from 'app/entities/resource-training/resource-training.model';
import { ResourceTrainingService } from 'app/entities/resource-training/service/resource-training.service';
import { TrainingService } from '../service/training.service';
import { ITraining } from '../training.model';
import { TrainingFormService, TrainingFormGroup } from './training-form.service';

@Component({
  standalone: true,
  selector: 'jhi-training-update',
  templateUrl: './training-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TrainingUpdateComponent implements OnInit {
  isSaving = false;
  training: ITraining | null = null;

  positionRequirementsCollection: IPositionRequirement[] = [];
  resourceTrainingsCollection: IResourceTraining[] = [];

  editForm: TrainingFormGroup = this.trainingFormService.createTrainingFormGroup();

  constructor(
    protected trainingService: TrainingService,
    protected trainingFormService: TrainingFormService,
    protected positionRequirementService: PositionRequirementService,
    protected resourceTrainingService: ResourceTrainingService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  comparePositionRequirement = (o1: IPositionRequirement | null, o2: IPositionRequirement | null): boolean =>
    this.positionRequirementService.comparePositionRequirement(o1, o2);

  compareResourceTraining = (o1: IResourceTraining | null, o2: IResourceTraining | null): boolean =>
    this.resourceTrainingService.compareResourceTraining(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ training }) => {
      this.training = training;
      if (training) {
        this.updateForm(training);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const training = this.trainingFormService.getTraining(this.editForm);
    if (training.id !== null) {
      this.subscribeToSaveResponse(this.trainingService.update(training));
    } else {
      this.subscribeToSaveResponse(this.trainingService.create(training));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITraining>>): void {
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

  protected updateForm(training: ITraining): void {
    this.training = training;
    this.trainingFormService.resetForm(this.editForm, training);

    this.positionRequirementsCollection = this.positionRequirementService.addPositionRequirementToCollectionIfMissing<IPositionRequirement>(
      this.positionRequirementsCollection,
      training.positionRequirement,
    );
    this.resourceTrainingsCollection = this.resourceTrainingService.addResourceTrainingToCollectionIfMissing<IResourceTraining>(
      this.resourceTrainingsCollection,
      training.resourceTraining,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.positionRequirementService
      .query({ filter: 'training-is-null' })
      .pipe(map((res: HttpResponse<IPositionRequirement[]>) => res.body ?? []))
      .pipe(
        map((positionRequirements: IPositionRequirement[]) =>
          this.positionRequirementService.addPositionRequirementToCollectionIfMissing<IPositionRequirement>(
            positionRequirements,
            this.training?.positionRequirement,
          ),
        ),
      )
      .subscribe((positionRequirements: IPositionRequirement[]) => (this.positionRequirementsCollection = positionRequirements));

    this.resourceTrainingService
      .query({ filter: 'training-is-null' })
      .pipe(map((res: HttpResponse<IResourceTraining[]>) => res.body ?? []))
      .pipe(
        map((resourceTrainings: IResourceTraining[]) =>
          this.resourceTrainingService.addResourceTrainingToCollectionIfMissing<IResourceTraining>(
            resourceTrainings,
            this.training?.resourceTraining,
          ),
        ),
      )
      .subscribe((resourceTrainings: IResourceTraining[]) => (this.resourceTrainingsCollection = resourceTrainings));
  }
}
