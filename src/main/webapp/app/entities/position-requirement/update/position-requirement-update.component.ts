import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IPositionRequirement } from '../position-requirement.model';
import { PositionRequirementService } from '../service/position-requirement.service';
import { PositionRequirementFormService, PositionRequirementFormGroup } from './position-requirement-form.service';

@Component({
  standalone: true,
  selector: 'jhi-position-requirement-update',
  templateUrl: './position-requirement-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class PositionRequirementUpdateComponent implements OnInit {
  isSaving = false;
  positionRequirement: IPositionRequirement | null = null;

  editForm: PositionRequirementFormGroup = this.positionRequirementFormService.createPositionRequirementFormGroup();

  constructor(
    protected positionRequirementService: PositionRequirementService,
    protected positionRequirementFormService: PositionRequirementFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ positionRequirement }) => {
      this.positionRequirement = positionRequirement;
      if (positionRequirement) {
        this.updateForm(positionRequirement);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const positionRequirement = this.positionRequirementFormService.getPositionRequirement(this.editForm);
    if (positionRequirement.id !== null) {
      this.subscribeToSaveResponse(this.positionRequirementService.update(positionRequirement));
    } else {
      this.subscribeToSaveResponse(this.positionRequirementService.create(positionRequirement));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPositionRequirement>>): void {
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

  protected updateForm(positionRequirement: IPositionRequirement): void {
    this.positionRequirement = positionRequirement;
    this.positionRequirementFormService.resetForm(this.editForm, positionRequirement);
  }
}
