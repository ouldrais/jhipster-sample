import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IShiftDemand } from '../shift-demand.model';
import { ShiftDemandService } from '../service/shift-demand.service';
import { ShiftDemandFormService, ShiftDemandFormGroup } from './shift-demand-form.service';

@Component({
  standalone: true,
  selector: 'jhi-shift-demand-update',
  templateUrl: './shift-demand-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ShiftDemandUpdateComponent implements OnInit {
  isSaving = false;
  shiftDemand: IShiftDemand | null = null;

  editForm: ShiftDemandFormGroup = this.shiftDemandFormService.createShiftDemandFormGroup();

  constructor(
    protected shiftDemandService: ShiftDemandService,
    protected shiftDemandFormService: ShiftDemandFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shiftDemand }) => {
      this.shiftDemand = shiftDemand;
      if (shiftDemand) {
        this.updateForm(shiftDemand);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shiftDemand = this.shiftDemandFormService.getShiftDemand(this.editForm);
    if (shiftDemand.id !== null) {
      this.subscribeToSaveResponse(this.shiftDemandService.update(shiftDemand));
    } else {
      this.subscribeToSaveResponse(this.shiftDemandService.create(shiftDemand));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShiftDemand>>): void {
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

  protected updateForm(shiftDemand: IShiftDemand): void {
    this.shiftDemand = shiftDemand;
    this.shiftDemandFormService.resetForm(this.editForm, shiftDemand);
  }
}
