import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IPositionRequirement } from 'app/entities/position-requirement/position-requirement.model';
import { PositionRequirementService } from 'app/entities/position-requirement/service/position-requirement.service';
import { IResourcePlan } from 'app/entities/resource-plan/resource-plan.model';
import { ResourcePlanService } from 'app/entities/resource-plan/service/resource-plan.service';
import { IPosition } from '../position.model';
import { PositionService } from '../service/position.service';
import { PositionFormService } from './position-form.service';

import { PositionUpdateComponent } from './position-update.component';

describe('Position Management Update Component', () => {
  let comp: PositionUpdateComponent;
  let fixture: ComponentFixture<PositionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let positionFormService: PositionFormService;
  let positionService: PositionService;
  let positionRequirementService: PositionRequirementService;
  let resourcePlanService: ResourcePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), PositionUpdateComponent],
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
      .overrideTemplate(PositionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PositionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    positionFormService = TestBed.inject(PositionFormService);
    positionService = TestBed.inject(PositionService);
    positionRequirementService = TestBed.inject(PositionRequirementService);
    resourcePlanService = TestBed.inject(ResourcePlanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call positionRequirement query and add missing value', () => {
      const position: IPosition = { id: 456 };
      const positionRequirement: IPositionRequirement = { id: 24403 };
      position.positionRequirement = positionRequirement;

      const positionRequirementCollection: IPositionRequirement[] = [{ id: 23591 }];
      jest.spyOn(positionRequirementService, 'query').mockReturnValue(of(new HttpResponse({ body: positionRequirementCollection })));
      const expectedCollection: IPositionRequirement[] = [positionRequirement, ...positionRequirementCollection];
      jest.spyOn(positionRequirementService, 'addPositionRequirementToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ position });
      comp.ngOnInit();

      expect(positionRequirementService.query).toHaveBeenCalled();
      expect(positionRequirementService.addPositionRequirementToCollectionIfMissing).toHaveBeenCalledWith(
        positionRequirementCollection,
        positionRequirement,
      );
      expect(comp.positionRequirementsCollection).toEqual(expectedCollection);
    });

    it('Should call resourcePlan query and add missing value', () => {
      const position: IPosition = { id: 456 };
      const resourcePlan: IResourcePlan = { id: 27725 };
      position.resourcePlan = resourcePlan;

      const resourcePlanCollection: IResourcePlan[] = [{ id: 13342 }];
      jest.spyOn(resourcePlanService, 'query').mockReturnValue(of(new HttpResponse({ body: resourcePlanCollection })));
      const expectedCollection: IResourcePlan[] = [resourcePlan, ...resourcePlanCollection];
      jest.spyOn(resourcePlanService, 'addResourcePlanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ position });
      comp.ngOnInit();

      expect(resourcePlanService.query).toHaveBeenCalled();
      expect(resourcePlanService.addResourcePlanToCollectionIfMissing).toHaveBeenCalledWith(resourcePlanCollection, resourcePlan);
      expect(comp.resourcePlansCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const position: IPosition = { id: 456 };
      const positionRequirement: IPositionRequirement = { id: 4605 };
      position.positionRequirement = positionRequirement;
      const resourcePlan: IResourcePlan = { id: 25573 };
      position.resourcePlan = resourcePlan;

      activatedRoute.data = of({ position });
      comp.ngOnInit();

      expect(comp.positionRequirementsCollection).toContain(positionRequirement);
      expect(comp.resourcePlansCollection).toContain(resourcePlan);
      expect(comp.position).toEqual(position);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPosition>>();
      const position = { id: 123 };
      jest.spyOn(positionFormService, 'getPosition').mockReturnValue(position);
      jest.spyOn(positionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ position });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: position }));
      saveSubject.complete();

      // THEN
      expect(positionFormService.getPosition).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(positionService.update).toHaveBeenCalledWith(expect.objectContaining(position));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPosition>>();
      const position = { id: 123 };
      jest.spyOn(positionFormService, 'getPosition').mockReturnValue({ id: null });
      jest.spyOn(positionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ position: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: position }));
      saveSubject.complete();

      // THEN
      expect(positionFormService.getPosition).toHaveBeenCalled();
      expect(positionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPosition>>();
      const position = { id: 123 };
      jest.spyOn(positionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ position });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(positionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePositionRequirement', () => {
      it('Should forward to positionRequirementService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(positionRequirementService, 'comparePositionRequirement');
        comp.comparePositionRequirement(entity, entity2);
        expect(positionRequirementService.comparePositionRequirement).toHaveBeenCalledWith(entity, entity2);
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
