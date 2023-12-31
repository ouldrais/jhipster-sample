import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ResourcePlanService } from '../service/resource-plan.service';
import { IResourcePlan } from '../resource-plan.model';
import { ResourcePlanFormService } from './resource-plan-form.service';

import { ResourcePlanUpdateComponent } from './resource-plan-update.component';

describe('ResourcePlan Management Update Component', () => {
  let comp: ResourcePlanUpdateComponent;
  let fixture: ComponentFixture<ResourcePlanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let resourcePlanFormService: ResourcePlanFormService;
  let resourcePlanService: ResourcePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ResourcePlanUpdateComponent],
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
      .overrideTemplate(ResourcePlanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ResourcePlanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    resourcePlanFormService = TestBed.inject(ResourcePlanFormService);
    resourcePlanService = TestBed.inject(ResourcePlanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const resourcePlan: IResourcePlan = { id: 456 };

      activatedRoute.data = of({ resourcePlan });
      comp.ngOnInit();

      expect(comp.resourcePlan).toEqual(resourcePlan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IResourcePlan>>();
      const resourcePlan = { id: 123 };
      jest.spyOn(resourcePlanFormService, 'getResourcePlan').mockReturnValue(resourcePlan);
      jest.spyOn(resourcePlanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ resourcePlan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: resourcePlan }));
      saveSubject.complete();

      // THEN
      expect(resourcePlanFormService.getResourcePlan).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(resourcePlanService.update).toHaveBeenCalledWith(expect.objectContaining(resourcePlan));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IResourcePlan>>();
      const resourcePlan = { id: 123 };
      jest.spyOn(resourcePlanFormService, 'getResourcePlan').mockReturnValue({ id: null });
      jest.spyOn(resourcePlanService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ resourcePlan: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: resourcePlan }));
      saveSubject.complete();

      // THEN
      expect(resourcePlanFormService.getResourcePlan).toHaveBeenCalled();
      expect(resourcePlanService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IResourcePlan>>();
      const resourcePlan = { id: 123 };
      jest.spyOn(resourcePlanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ resourcePlan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(resourcePlanService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
