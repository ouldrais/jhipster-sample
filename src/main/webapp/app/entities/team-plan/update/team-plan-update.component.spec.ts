import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TeamPlanService } from '../service/team-plan.service';
import { ITeamPlan } from '../team-plan.model';
import { TeamPlanFormService } from './team-plan-form.service';

import { TeamPlanUpdateComponent } from './team-plan-update.component';

describe('TeamPlan Management Update Component', () => {
  let comp: TeamPlanUpdateComponent;
  let fixture: ComponentFixture<TeamPlanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let teamPlanFormService: TeamPlanFormService;
  let teamPlanService: TeamPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TeamPlanUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TeamPlanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TeamPlanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    teamPlanFormService = TestBed.inject(TeamPlanFormService);
    teamPlanService = TestBed.inject(TeamPlanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const teamPlan: ITeamPlan = { id: 456 };

      activatedRoute.data = of({ teamPlan });
      comp.ngOnInit();

      expect(comp.teamPlan).toEqual(teamPlan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITeamPlan>>();
      const teamPlan = { id: 123 };
      jest.spyOn(teamPlanFormService, 'getTeamPlan').mockReturnValue(teamPlan);
      jest.spyOn(teamPlanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ teamPlan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: teamPlan }));
      saveSubject.complete();

      // THEN
      expect(teamPlanFormService.getTeamPlan).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(teamPlanService.update).toHaveBeenCalledWith(expect.objectContaining(teamPlan));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITeamPlan>>();
      const teamPlan = { id: 123 };
      jest.spyOn(teamPlanFormService, 'getTeamPlan').mockReturnValue({ id: null });
      jest.spyOn(teamPlanService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ teamPlan: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: teamPlan }));
      saveSubject.complete();

      // THEN
      expect(teamPlanFormService.getTeamPlan).toHaveBeenCalled();
      expect(teamPlanService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITeamPlan>>();
      const teamPlan = { id: 123 };
      jest.spyOn(teamPlanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ teamPlan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(teamPlanService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
