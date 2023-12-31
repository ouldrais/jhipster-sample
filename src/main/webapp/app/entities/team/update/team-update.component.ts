import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IResource } from 'app/entities/resource/resource.model';
import { ResourceService } from 'app/entities/resource/service/resource.service';
import { ITeamPlan } from 'app/entities/team-plan/team-plan.model';
import { TeamPlanService } from 'app/entities/team-plan/service/team-plan.service';
import { TeamService } from '../service/team.service';
import { ITeam } from '../team.model';
import { TeamFormService, TeamFormGroup } from './team-form.service';

@Component({
  standalone: true,
  selector: 'jhi-team-update',
  templateUrl: './team-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TeamUpdateComponent implements OnInit {
  isSaving = false;
  team: ITeam | null = null;

  resourcesCollection: IResource[] = [];
  teamPlansCollection: ITeamPlan[] = [];

  editForm: TeamFormGroup = this.teamFormService.createTeamFormGroup();

  constructor(
    protected teamService: TeamService,
    protected teamFormService: TeamFormService,
    protected resourceService: ResourceService,
    protected teamPlanService: TeamPlanService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareResource = (o1: IResource | null, o2: IResource | null): boolean => this.resourceService.compareResource(o1, o2);

  compareTeamPlan = (o1: ITeamPlan | null, o2: ITeamPlan | null): boolean => this.teamPlanService.compareTeamPlan(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ team }) => {
      this.team = team;
      if (team) {
        this.updateForm(team);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const team = this.teamFormService.getTeam(this.editForm);
    if (team.id !== null) {
      this.subscribeToSaveResponse(this.teamService.update(team));
    } else {
      this.subscribeToSaveResponse(this.teamService.create(team));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeam>>): void {
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

  protected updateForm(team: ITeam): void {
    this.team = team;
    this.teamFormService.resetForm(this.editForm, team);

    this.resourcesCollection = this.resourceService.addResourceToCollectionIfMissing<IResource>(this.resourcesCollection, team.resource);
    this.teamPlansCollection = this.teamPlanService.addTeamPlanToCollectionIfMissing<ITeamPlan>(this.teamPlansCollection, team.teamPlan);
  }

  protected loadRelationshipsOptions(): void {
    this.resourceService
      .query({ filter: 'team-is-null' })
      .pipe(map((res: HttpResponse<IResource[]>) => res.body ?? []))
      .pipe(
        map((resources: IResource[]) => this.resourceService.addResourceToCollectionIfMissing<IResource>(resources, this.team?.resource)),
      )
      .subscribe((resources: IResource[]) => (this.resourcesCollection = resources));

    this.teamPlanService
      .query({ filter: 'team-is-null' })
      .pipe(map((res: HttpResponse<ITeamPlan[]>) => res.body ?? []))
      .pipe(
        map((teamPlans: ITeamPlan[]) => this.teamPlanService.addTeamPlanToCollectionIfMissing<ITeamPlan>(teamPlans, this.team?.teamPlan)),
      )
      .subscribe((teamPlans: ITeamPlan[]) => (this.teamPlansCollection = teamPlans));
  }
}
