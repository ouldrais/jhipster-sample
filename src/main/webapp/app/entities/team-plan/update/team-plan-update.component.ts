import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITeamPlan } from '../team-plan.model';
import { TeamPlanService } from '../service/team-plan.service';
import { TeamPlanFormService, TeamPlanFormGroup } from './team-plan-form.service';

@Component({
  standalone: true,
  selector: 'jhi-team-plan-update',
  templateUrl: './team-plan-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TeamPlanUpdateComponent implements OnInit {
  isSaving = false;
  teamPlan: ITeamPlan | null = null;

  editForm: TeamPlanFormGroup = this.teamPlanFormService.createTeamPlanFormGroup();

  constructor(
    protected teamPlanService: TeamPlanService,
    protected teamPlanFormService: TeamPlanFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ teamPlan }) => {
      this.teamPlan = teamPlan;
      if (teamPlan) {
        this.updateForm(teamPlan);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const teamPlan = this.teamPlanFormService.getTeamPlan(this.editForm);
    if (teamPlan.id !== null) {
      this.subscribeToSaveResponse(this.teamPlanService.update(teamPlan));
    } else {
      this.subscribeToSaveResponse(this.teamPlanService.create(teamPlan));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeamPlan>>): void {
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

  protected updateForm(teamPlan: ITeamPlan): void {
    this.teamPlan = teamPlan;
    this.teamPlanFormService.resetForm(this.editForm, teamPlan);
  }
}
