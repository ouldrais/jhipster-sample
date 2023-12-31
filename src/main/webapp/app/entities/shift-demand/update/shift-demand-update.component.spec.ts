import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ShiftDemandService } from '../service/shift-demand.service';
import { IShiftDemand } from '../shift-demand.model';
import { ShiftDemandFormService } from './shift-demand-form.service';

import { ShiftDemandUpdateComponent } from './shift-demand-update.component';

describe('ShiftDemand Management Update Component', () => {
  let comp: ShiftDemandUpdateComponent;
  let fixture: ComponentFixture<ShiftDemandUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let shiftDemandFormService: ShiftDemandFormService;
  let shiftDemandService: ShiftDemandService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ShiftDemandUpdateComponent],
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
      .overrideTemplate(ShiftDemandUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ShiftDemandUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    shiftDemandFormService = TestBed.inject(ShiftDemandFormService);
    shiftDemandService = TestBed.inject(ShiftDemandService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const shiftDemand: IShiftDemand = { id: 456 };

      activatedRoute.data = of({ shiftDemand });
      comp.ngOnInit();

      expect(comp.shiftDemand).toEqual(shiftDemand);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IShiftDemand>>();
      const shiftDemand = { id: 123 };
      jest.spyOn(shiftDemandFormService, 'getShiftDemand').mockReturnValue(shiftDemand);
      jest.spyOn(shiftDemandService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shiftDemand });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: shiftDemand }));
      saveSubject.complete();

      // THEN
      expect(shiftDemandFormService.getShiftDemand).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(shiftDemandService.update).toHaveBeenCalledWith(expect.objectContaining(shiftDemand));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IShiftDemand>>();
      const shiftDemand = { id: 123 };
      jest.spyOn(shiftDemandFormService, 'getShiftDemand').mockReturnValue({ id: null });
      jest.spyOn(shiftDemandService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shiftDemand: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: shiftDemand }));
      saveSubject.complete();

      // THEN
      expect(shiftDemandFormService.getShiftDemand).toHaveBeenCalled();
      expect(shiftDemandService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IShiftDemand>>();
      const shiftDemand = { id: 123 };
      jest.spyOn(shiftDemandService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shiftDemand });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(shiftDemandService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
