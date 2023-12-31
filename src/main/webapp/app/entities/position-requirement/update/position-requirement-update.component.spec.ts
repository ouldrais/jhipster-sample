import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PositionRequirementService } from '../service/position-requirement.service';
import { IPositionRequirement } from '../position-requirement.model';
import { PositionRequirementFormService } from './position-requirement-form.service';

import { PositionRequirementUpdateComponent } from './position-requirement-update.component';

describe('PositionRequirement Management Update Component', () => {
  let comp: PositionRequirementUpdateComponent;
  let fixture: ComponentFixture<PositionRequirementUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let positionRequirementFormService: PositionRequirementFormService;
  let positionRequirementService: PositionRequirementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), PositionRequirementUpdateComponent],
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
      .overrideTemplate(PositionRequirementUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PositionRequirementUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    positionRequirementFormService = TestBed.inject(PositionRequirementFormService);
    positionRequirementService = TestBed.inject(PositionRequirementService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const positionRequirement: IPositionRequirement = { id: 456 };

      activatedRoute.data = of({ positionRequirement });
      comp.ngOnInit();

      expect(comp.positionRequirement).toEqual(positionRequirement);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPositionRequirement>>();
      const positionRequirement = { id: 123 };
      jest.spyOn(positionRequirementFormService, 'getPositionRequirement').mockReturnValue(positionRequirement);
      jest.spyOn(positionRequirementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ positionRequirement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: positionRequirement }));
      saveSubject.complete();

      // THEN
      expect(positionRequirementFormService.getPositionRequirement).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(positionRequirementService.update).toHaveBeenCalledWith(expect.objectContaining(positionRequirement));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPositionRequirement>>();
      const positionRequirement = { id: 123 };
      jest.spyOn(positionRequirementFormService, 'getPositionRequirement').mockReturnValue({ id: null });
      jest.spyOn(positionRequirementService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ positionRequirement: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: positionRequirement }));
      saveSubject.complete();

      // THEN
      expect(positionRequirementFormService.getPositionRequirement).toHaveBeenCalled();
      expect(positionRequirementService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPositionRequirement>>();
      const positionRequirement = { id: 123 };
      jest.spyOn(positionRequirementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ positionRequirement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(positionRequirementService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
