import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ITeamPlan } from 'app/entities/team-plan/team-plan.model';
import { TeamPlanService } from 'app/entities/team-plan/service/team-plan.service';
import { IShiftDemand } from 'app/entities/shift-demand/shift-demand.model';
import { ShiftDemandService } from 'app/entities/shift-demand/service/shift-demand.service';
import { IResourcePlan } from 'app/entities/resource-plan/resource-plan.model';
import { ResourcePlanService } from 'app/entities/resource-plan/service/resource-plan.service';
import { IShift } from '../shift.model';
import { ShiftService } from '../service/shift.service';
import { ShiftFormService } from './shift-form.service';

import { ShiftUpdateComponent } from './shift-update.component';

describe('Shift Management Update Component', () => {
  let comp: ShiftUpdateComponent;
  let fixture: ComponentFixture<ShiftUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let shiftFormService: ShiftFormService;
  let shiftService: ShiftService;
  let teamPlanService: TeamPlanService;
  let shiftDemandService: ShiftDemandService;
  let resourcePlanService: ResourcePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ShiftUpdateComponent],
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
      .overrideTemplate(ShiftUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ShiftUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    shiftFormService = TestBed.inject(ShiftFormService);
    shiftService = TestBed.inject(ShiftService);
    teamPlanService = TestBed.inject(TeamPlanService);
    shiftDemandService = TestBed.inject(ShiftDemandService);
    resourcePlanService = TestBed.inject(ResourcePlanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call teamPlan query and add missing value', () => {
      const shift: IShift = { id: 456 };
      const teamPlan: ITeamPlan = { id: 212 };
      shift.teamPlan = teamPlan;

      const teamPlanCollection: ITeamPlan[] = [{ id: 29964 }];
      jest.spyOn(teamPlanService, 'query').mockReturnValue(of(new HttpResponse({ body: teamPlanCollection })));
      const expectedCollection: ITeamPlan[] = [teamPlan, ...teamPlanCollection];
      jest.spyOn(teamPlanService, 'addTeamPlanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ shift });
      comp.ngOnInit();

      expect(teamPlanService.query).toHaveBeenCalled();
      expect(teamPlanService.addTeamPlanToCollectionIfMissing).toHaveBeenCalledWith(teamPlanCollection, teamPlan);
      expect(comp.teamPlansCollection).toEqual(expectedCollection);
    });

    it('Should call shiftDemand query and add missing value', () => {
      const shift: IShift = { id: 456 };
      const shiftDemand: IShiftDemand = { id: 21088 };
      shift.shiftDemand = shiftDemand;

      const shiftDemandCollection: IShiftDemand[] = [{ id: 6829 }];
      jest.spyOn(shiftDemandService, 'query').mockReturnValue(of(new HttpResponse({ body: shiftDemandCollection })));
      const expectedCollection: IShiftDemand[] = [shiftDemand, ...shiftDemandCollection];
      jest.spyOn(shiftDemandService, 'addShiftDemandToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ shift });
      comp.ngOnInit();

      expect(shiftDemandService.query).toHaveBeenCalled();
      expect(shiftDemandService.addShiftDemandToCollectionIfMissing).toHaveBeenCalledWith(shiftDemandCollection, shiftDemand);
      expect(comp.shiftDemandsCollection).toEqual(expectedCollection);
    });

    it('Should call resourcePlan query and add missing value', () => {
      const shift: IShift = { id: 456 };
      const resourcePlan: IResourcePlan = { id: 9297 };
      shift.resourcePlan = resourcePlan;

      const resourcePlanCollection: IResourcePlan[] = [{ id: 12308 }];
      jest.spyOn(resourcePlanService, 'query').mockReturnValue(of(new HttpResponse({ body: resourcePlanCollection })));
      const expectedCollection: IResourcePlan[] = [resourcePlan, ...resourcePlanCollection];
      jest.spyOn(resourcePlanService, 'addResourcePlanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ shift });
      comp.ngOnInit();

      expect(resourcePlanService.query).toHaveBeenCalled();
      expect(resourcePlanService.addResourcePlanToCollectionIfMissing).toHaveBeenCalledWith(resourcePlanCollection, resourcePlan);
      expect(comp.resourcePlansCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const shift: IShift = { id: 456 };
      const teamPlan: ITeamPlan = { id: 25597 };
      shift.teamPlan = teamPlan;
      const shiftDemand: IShiftDemand = { id: 4334 };
      shift.shiftDemand = shiftDemand;
      const resourcePlan: IResourcePlan = { id: 20051 };
      shift.resourcePlan = resourcePlan;

      activatedRoute.data = of({ shift });
      comp.ngOnInit();

      expect(comp.teamPlansCollection).toContain(teamPlan);
      expect(comp.shiftDemandsCollection).toContain(shiftDemand);
      expect(comp.resourcePlansCollection).toContain(resourcePlan);
      expect(comp.shift).toEqual(shift);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IShift>>();
      const shift = { id: 123 };
      jest.spyOn(shiftFormService, 'getShift').mockReturnValue(shift);
      jest.spyOn(shiftService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shift });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: shift }));
      saveSubject.complete();

      // THEN
      expect(shiftFormService.getShift).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(shiftService.update).toHaveBeenCalledWith(expect.objectContaining(shift));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IShift>>();
      const shift = { id: 123 };
      jest.spyOn(shiftFormService, 'getShift').mockReturnValue({ id: null });
      jest.spyOn(shiftService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shift: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: shift }));
      saveSubject.complete();

      // THEN
      expect(shiftFormService.getShift).toHaveBeenCalled();
      expect(shiftService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IShift>>();
      const shift = { id: 123 };
      jest.spyOn(shiftService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shift });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(shiftService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTeamPlan', () => {
      it('Should forward to teamPlanService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(teamPlanService, 'compareTeamPlan');
        comp.compareTeamPlan(entity, entity2);
        expect(teamPlanService.compareTeamPlan).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareShiftDemand', () => {
      it('Should forward to shiftDemandService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(shiftDemandService, 'compareShiftDemand');
        comp.compareShiftDemand(entity, entity2);
        expect(shiftDemandService.compareShiftDemand).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareResourcePlan', () => {
      it('Should forward to resourcePlanService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(resourcePlanService, 'compareResourcePlan');
        comp.compareResourcePlan(entity, entity2);
        expect(resourcePlanService.compareResourcePlan).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
