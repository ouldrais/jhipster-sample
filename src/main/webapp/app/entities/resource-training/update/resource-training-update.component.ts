import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IResourceTraining } from '../resource-training.model';
import { ResourceTrainingService } from '../service/resource-training.service';
import { ResourceTrainingFormService, ResourceTrainingFormGroup } from './resource-training-form.service';

@Component({
  standalone: true,
  selector: 'jhi-resource-training-update',
  templateUrl: './resource-training-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ResourceTrainingUpdateComponent implements OnInit {
  isSaving = false;
  resourceTraining: IResourceTraining | null = null;

  editForm: ResourceTrainingFormGroup = this.resourceTrainingFormService.createResourceTrainingFormGroup();

  constructor(
    protected resourceTrainingService: ResourceTrainingService,
    protected resourceTrainingFormService: ResourceTrainingFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ resourceTraining }) => {
      this.resourceTraining = resourceTraining;
      if (resourceTraining) {
        this.updateForm(resourceTraining);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const resourceTraining = this.resourceTrainingFormService.getResourceTraining(this.editForm);
    if (resourceTraining.id !== null) {
      this.subscribeToSaveResponse(this.resourceTrainingService.update(resourceTraining));
    } else {
      this.subscribeToSaveResponse(this.resourceTrainingService.create(resourceTraining));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IResourceTraining>>): void {
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

  protected updateForm(resourceTraining: IResourceTraining): void {
    this.resourceTraining = resourceTraining;
    this.resourceTrainingFormService.resetForm(this.editForm, resourceTraining);
  }
}
