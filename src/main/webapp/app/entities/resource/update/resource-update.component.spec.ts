import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IResourceTraining } from 'app/entities/resource-training/resource-training.model';
import { ResourceTrainingService } from 'app/entities/resource-training/service/resource-training.service';
import { IResourcePlan } from 'app/entities/resource-plan/resource-plan.model';
import { ResourcePlanService } from 'app/entities/resource-plan/service/resource-plan.service';
import { IResource } from '../resource.model';
import { ResourceService } from '../service/resource.service';
import { ResourceFormService } from './resource-form.service';

import { ResourceUpdateComponent } from './resource-update.component';

describe('Resource Management Update Component', () => {
  let comp: ResourceUpdateComponent;
  let fixture: ComponentFixture<ResourceUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let resourceFormService: ResourceFormService;
  let resourceService: ResourceService;
  let resourceTrainingService: ResourceTrainingService;
  let resourcePlanService: ResourcePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ResourceUpdateComponent],
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
      .overrideTemplate(ResourceUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ResourceUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    resourceFormService = TestBed.inject(ResourceFormService);
    resourceService = TestBed.inject(ResourceService);
    resourceTrainingService = TestBed.inject(ResourceTrainingService);
    resourcePlanService = TestBed.inject(ResourcePlanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call resourceTraining query and add missing value', () => {
      const resource: IResource = { id: 456 };
      const resourceTraining: IResourceTraining = { id: 21226 };
      resource.resourceTraining = resourceTraining;

      const resourceTrainingCollection: IResourceTraining[] = [{ id: 22828 }];
      jest.spyOn(resourceTrainingService, 'query').mockReturnValue(of(new HttpResponse({ body: resourceTrainingCollection })));
      const expectedCollection: IResourceTraining[] = [resourceTraining, ...resourceTrainingCollection];
      jest.spyOn(resourceTrainingService, 'addResourceTrainingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ resource });
      comp.ngOnInit();

      expect(resourceTrainingService.query).toHaveBeenCalled();
      expect(resourceTrainingService.addResourceTrainingToCollectionIfMissing).toHaveBeenCalledWith(
        resourceTrainingCollection,
        resourceTraining,
      );
      expect(comp.resourceTrainingsCollection).toEqual(expectedCollection);
    });

    it('Should call resourcePlan query and add missing value', () => {
      const resource: IResource = { id: 456 };
      const resourcePlan: IResourcePlan = { id: 24601 };
      resource.resourcePlan = resourcePlan;

      const resourcePlanCollection: IResourcePlan[] = [{ id: 6445 }];
      jest.spyOn(resourcePlanService, 'query').mockReturnValue(of(new HttpResponse({ body: resourcePlanCollection })));
      const expectedCollection: IResourcePlan[] = [resourcePlan, ...resourcePlanCollection];
      jest.spyOn(resourcePlanService, 'addResourcePlanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ resource });
      comp.ngOnInit();

      expect(resourcePlanService.query).toHaveBeenCalled();
      expect(resourcePlanService.addResourcePlanToCollectionIfMissing).toHaveBeenCalledWith(resourcePlanCollection, resourcePlan);
      expect(comp.resourcePlansCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const resource: IResource = { id: 456 };
      const resourceTraining: IResourceTraining = { id: 18816 };
      resource.resourceTraining = resourceTraining;
      const resourcePlan: IResourcePlan = { id: 23 };
      resource.resourcePlan = resourcePlan;

      activatedRoute.data = of({ resource });
      comp.ngOnInit();

      expect(comp.resourceTrainingsCollection).toContain(resourceTraining);
      expect(comp.resourcePlansCollection).toContain(resourcePlan);
      expect(comp.resource).toEqual(resource);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IResource>>();
      const resource = { id: 123 };
      jest.spyOn(resourceFormService, 'getResource').mockReturnValue(resource);
      jest.spyOn(resourceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ resource });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: resource }));
      saveSubject.complete();

      // THEN
      expect(resourceFormService.getResource).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(resourceService.update).toHaveBeenCalledWith(expect.objectContaining(resource));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IResource>>();
      const resource = { id: 123 };
      jest.spyOn(resourceFormService, 'getResource').mockReturnValue({ id: null });
      jest.spyOn(resourceService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ resource: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: resource }));
      saveSubject.complete();

      // THEN
      expect(resourceFormService.getResource).toHaveBeenCalled();
      expect(resourceService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IResource>>();
      const resource = { id: 123 };
      jest.spyOn(resourceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ resource });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(resourceService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareResourceTraining', () => {
      it('Should forward to resourceTrainingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(resourceTrainingService, 'compareResourceTraining');
        comp.compareResourceTraining(entity, entity2);
        expect(resourceTrainingService.compareResourceTraining).toHaveBeenCalledWith(entity, entity2);
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
