import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IResourcePlan } from '../resource-plan.model';
import { ResourcePlanService } from '../service/resource-plan.service';
import { ResourcePlanFormService, ResourcePlanFormGroup } from './resource-plan-form.service';

@Component({
  standalone: true,
  selector: 'jhi-resource-plan-update',
  templateUrl: './resource-plan-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ResourcePlanUpdateComponent implements OnInit {
  isSaving = false;
  resourcePlan: IResourcePlan | null = null;

  editForm: ResourcePlanFormGroup = this.resourcePlanFormService.createResourcePlanFormGroup();

  constructor(
    protected resourcePlanService: ResourcePlanService,
    protected resourcePlanFormService: ResourcePlanFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ resourcePlan }) => {
      this.resourcePlan = resourcePlan;
      if (resourcePlan) {
        this.updateForm(resourcePlan);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const resourcePlan = this.resourcePlanFormService.getResourcePlan(this.editForm);
    if (resourcePlan.id !== null) {
      this.subscribeToSaveResponse(this.resourcePlanService.update(resourcePlan));
    } else {
      this.subscribeToSaveResponse(this.resourcePlanService.create(resourcePlan));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IResourcePlan>>): void {
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

  protected updateForm(resourcePlan: IResourcePlan): void {
    this.resourcePlan = resourcePlan;
    this.resourcePlanFormService.resetForm(this.editForm, resourcePlan);
  }
}
