import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ResourceTrainingService } from '../service/resource-training.service';
import { IResourceTraining } from '../resource-training.model';
import { ResourceTrainingFormService } from './resource-training-form.service';

import { ResourceTrainingUpdateComponent } from './resource-training-update.component';

describe('ResourceTraining Management Update Component', () => {
  let comp: ResourceTrainingUpdateComponent;
  let fixture: ComponentFixture<ResourceTrainingUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let resourceTrainingFormService: ResourceTrainingFormService;
  let resourceTrainingService: ResourceTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ResourceTrainingUpdateComponent],
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
      .overrideTemplate(ResourceTrainingUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ResourceTrainingUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    resourceTrainingFormService = TestBed.inject(ResourceTrainingFormService);
    resourceTrainingService = TestBed.inject(ResourceTrainingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const resourceTraining: IResourceTraining = { id: 456 };

      activatedRoute.data = of({ resourceTraining });
      comp.ngOnInit();

      expect(comp.resourceTraining).toEqual(resourceTraining);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IResourceTraining>>();
      const resourceTraining = { id: 123 };
      jest.spyOn(resourceTrainingFormService, 'getResourceTraining').mockReturnValue(resourceTraining);
      jest.spyOn(resourceTrainingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ resourceTraining });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: resourceTraining }));
      saveSubject.complete();

      // THEN
      expect(resourceTrainingFormService.getResourceTraining).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(resourceTrainingService.update).toHaveBeenCalledWith(expect.objectContaining(resourceTraining));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IResourceTraining>>();
      const resourceTraining = { id: 123 };
      jest.spyOn(resourceTrainingFormService, 'getResourceTraining').mockReturnValue({ id: null });
      jest.spyOn(resourceTrainingService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ resourceTraining: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: resourceTraining }));
      saveSubject.complete();

      // THEN
      expect(resourceTrainingFormService.getResourceTraining).toHaveBeenCalled();
      expect(resourceTrainingService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IResourceTraining>>();
      const resourceTraining = { id: 123 };
      jest.spyOn(resourceTrainingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ resourceTraining });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(resourceTrainingService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
