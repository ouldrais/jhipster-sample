import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IPositionRequirement } from 'app/entities/position-requirement/position-requirement.model';
import { PositionRequirementService } from 'app/entities/position-requirement/service/position-requirement.service';
import { IResourceTraining } from 'app/entities/resource-training/resource-training.model';
import { ResourceTrainingService } from 'app/entities/resource-training/service/resource-training.service';
import { ITraining } from '../training.model';
import { TrainingService } from '../service/training.service';
import { TrainingFormService } from './training-form.service';

import { TrainingUpdateComponent } from './training-update.component';

describe('Training Management Update Component', () => {
  let comp: TrainingUpdateComponent;
  let fixture: ComponentFixture<TrainingUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let trainingFormService: TrainingFormService;
  let trainingService: TrainingService;
  let positionRequirementService: PositionRequirementService;
  let resourceTrainingService: ResourceTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TrainingUpdateComponent],
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
      .overrideTemplate(TrainingUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TrainingUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    trainingFormService = TestBed.inject(TrainingFormService);
    trainingService = TestBed.inject(TrainingService);
    positionRequirementService = TestBed.inject(PositionRequirementService);
    resourceTrainingService = TestBed.inject(ResourceTrainingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call positionRequirement query and add missing value', () => {
      const training: ITraining = { id: 456 };
      const positionRequirement: IPositionRequirement = { id: 12992 };
      training.positionRequirement = positionRequirement;

      const positionRequirementCollection: IPositionRequirement[] = [{ id: 19659 }];
      jest.spyOn(positionRequirementService, 'query').mockReturnValue(of(new HttpResponse({ body: positionRequirementCollection })));
      const expectedCollection: IPositionRequirement[] = [positionRequirement, ...positionRequirementCollection];
      jest.spyOn(positionRequirementService, 'addPositionRequirementToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ training });
      comp.ngOnInit();

      expect(positionRequirementService.query).toHaveBeenCalled();
      expect(positionRequirementService.addPositionRequirementToCollectionIfMissing).toHaveBeenCalledWith(
        positionRequirementCollection,
        positionRequirement,
      );
      expect(comp.positionRequirementsCollection).toEqual(expectedCollection);
    });

    it('Should call resourceTraining query and add missing value', () => {
      const training: ITraining = { id: 456 };
      const resourceTraining: IResourceTraining = { id: 24574 };
      training.resourceTraining = resourceTraining;

      const resourceTrainingCollection: IResourceTraining[] = [{ id: 17888 }];
      jest.spyOn(resourceTrainingService, 'query').mockReturnValue(of(new HttpResponse({ body: resourceTrainingCollection })));
      const expectedCollection: IResourceTraining[] = [resourceTraining, ...resourceTrainingCollection];
      jest.spyOn(resourceTrainingService, 'addResourceTrainingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ training });
      comp.ngOnInit();

      expect(resourceTrainingService.query).toHaveBeenCalled();
      expect(resourceTrainingService.addResourceTrainingToCollectionIfMissing).toHaveBeenCalledWith(
        resourceTrainingCollection,
        resourceTraining,
      );
      expect(comp.resourceTrainingsCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const training: ITraining = { id: 456 };
      const positionRequirement: IPositionRequirement = { id: 8036 };
      training.positionRequirement = positionRequirement;
      const resourceTraining: IResourceTraining = { id: 10964 };
      training.resourceTraining = resourceTraining;

      activatedRoute.data = of({ training });
      comp.ngOnInit();

      expect(comp.positionRequirementsCollection).toContain(positionRequirement);
      expect(comp.resourceTrainingsCollection).toContain(resourceTraining);
      expect(comp.training).toEqual(training);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITraining>>();
      const training = { id: 123 };
      jest.spyOn(trainingFormService, 'getTraining').mockReturnValue(training);
      jest.spyOn(trainingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ training });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: training }));
      saveSubject.complete();

      // THEN
      expect(trainingFormService.getTraining).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(trainingService.update).toHaveBeenCalledWith(expect.objectContaining(training));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITraining>>();
      const training = { id: 123 };
      jest.spyOn(trainingFormService, 'getTraining').mockReturnValue({ id: null });
      jest.spyOn(trainingService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ training: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: training }));
      saveSubject.complete();

      // THEN
      expect(trainingFormService.getTraining).toHaveBeenCalled();
      expect(trainingService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITraining>>();
      const training = { id: 123 };
      jest.spyOn(trainingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ training });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(trainingService.update).toHaveBeenCalled();
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

    describe('compareResourceTraining', () => {
      it('Should forward to resourceTrainingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(resourceTrainingService, 'compareResourceTraining');
        comp.compareResourceTraining(entity, entity2);
        expect(resourceTrainingService.compareResourceTraining).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
