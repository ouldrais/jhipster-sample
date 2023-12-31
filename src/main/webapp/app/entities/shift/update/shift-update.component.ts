import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITeamPlan } from 'app/entities/team-plan/team-plan.model';
import { TeamPlanService } from 'app/entities/team-plan/service/team-plan.service';
import { IShiftDemand } from 'app/entities/shift-demand/shift-demand.model';
import { ShiftDemandService } from 'app/entities/shift-demand/service/shift-demand.service';
import { IResourcePlan } from 'app/entities/resource-plan/resource-plan.model';
import { ResourcePlanService } from 'app/entities/resource-plan/service/resource-plan.service';
import { ShiftService } from '../service/shift.service';
import { IShift } from '../shift.model';
import { ShiftFormService, ShiftFormGroup } from './shift-form.service';

@Component({
  standalone: true,
  selector: 'jhi-shift-update',
  templateUrl: './shift-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ShiftUpdateComponent implements OnInit {
  isSaving = false;
  shift: IShift | null = null;

  teamPlansCollection: ITeamPlan[] = [];
  shiftDemandsCollection: IShiftDemand[] = [];
  resourcePlansCollection: IResourcePlan[] = [];

  editForm: ShiftFormGroup = this.shiftFormService.createShiftFormGroup();

  constructor(
    protected shiftService: ShiftService,
    protected shiftFormService: ShiftFormService,
    protected teamPlanService: TeamPlanService,
    protected shiftDemandService: ShiftDemandService,
    protected resourcePlanService: ResourcePlanService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareTeamPlan = (o1: ITeamPlan | null, o2: ITeamPlan | null): boolean => this.teamPlanService.compareTeamPlan(o1, o2);

  compareShiftDemand = (o1: IShiftDemand | null, o2: IShiftDemand | null): boolean => this.shiftDemandService.compareShiftDemand(o1, o2);

  compareResourcePlan = (o1: IResourcePlan | null, o2: IResourcePlan | null): boolean =>
    this.resourcePlanService.compareResourcePlan(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shift }) => {
      this.shift = shift;
      if (shift) {
        this.updateForm(shift);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shift = this.shiftFormService.getShift(this.editForm);
    if (shift.id !== null) {
      this.subscribeToSaveResponse(this.shiftService.update(shift));
    } else {
      this.subscribeToSaveResponse(this.shiftService.create(shift));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShift>>): void {
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

  protected updateForm(shift: IShift): void {
    this.shift = shift;
    this.shiftFormService.resetForm(this.editForm, shift);

    this.teamPlansCollection = this.teamPlanService.addTeamPlanToCollectionIfMissing<ITeamPlan>(this.teamPlansCollection, shift.teamPlan);
    this.shiftDemandsCollection = this.shiftDemandService.addShiftDemandToCollectionIfMissing<IShiftDemand>(
      this.shiftDemandsCollection,
      shift.shiftDemand,
    );
    this.resourcePlansCollection = this.resourcePlanService.addResourcePlanToCollectionIfMissing<IResourcePlan>(
      this.resourcePlansCollection,
      shift.resourcePlan,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.teamPlanService
      .query({ filter: 'shift-is-null' })
      .pipe(map((res: HttpResponse<ITeamPlan[]>) => res.body ?? []))
      .pipe(
        map((teamPlans: ITeamPlan[]) => this.teamPlanService.addTeamPlanToCollectionIfMissing<ITeamPlan>(teamPlans, this.shift?.teamPlan)),
      )
      .subscribe((teamPlans: ITeamPlan[]) => (this.teamPlansCollection = teamPlans));

    this.shiftDemandService
      .query({ filter: 'shift-is-null' })
      .pipe(map((res: HttpResponse<IShiftDemand[]>) => res.body ?? []))
      .pipe(
        map((shiftDemands: IShiftDemand[]) =>
          this.shiftDemandService.addShiftDemandToCollectionIfMissing<IShiftDemand>(shiftDemands, this.shift?.shiftDemand),
        ),
      )
      .subscribe((shiftDemands: IShiftDemand[]) => (this.shiftDemandsCollection = shiftDemands));

    this.resourcePlanService
      .query({ filter: 'shift-is-null' })
      .pipe(map((res: HttpResponse<IResourcePlan[]>) => res.body ?? []))
      .pipe(
        map((resourcePlans: IResourcePlan[]) =>
          this.resourcePlanService.addResourcePlanToCollectionIfMissing<IResourcePlan>(resourcePlans, this.shift?.resourcePlan),
        ),
      )
      .subscribe((resourcePlans: IResourcePlan[]) => (this.resourcePlansCollection = resourcePlans));
  }
}
