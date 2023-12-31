import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IPosition } from 'app/entities/position/position.model';
import { PositionService } from 'app/entities/position/service/position.service';
import { IShiftDemand } from 'app/entities/shift-demand/shift-demand.model';
import { ShiftDemandService } from 'app/entities/shift-demand/service/shift-demand.service';
import { IDepartment } from '../department.model';
import { DepartmentService } from '../service/department.service';
import { DepartmentFormService } from './department-form.service';

import { DepartmentUpdateComponent } from './department-update.component';

describe('Department Management Update Component', () => {
  let comp: DepartmentUpdateComponent;
  let fixture: ComponentFixture<DepartmentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let departmentFormService: DepartmentFormService;
  let departmentService: DepartmentService;
  let positionService: PositionService;
  let shiftDemandService: ShiftDemandService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), DepartmentUpdateComponent],
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
      .overrideTemplate(DepartmentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DepartmentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    departmentFormService = TestBed.inject(DepartmentFormService);
    departmentService = TestBed.inject(DepartmentService);
    positionService = TestBed.inject(PositionService);
    shiftDemandService = TestBed.inject(ShiftDemandService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call position query and add missing value', () => {
      const department: IDepartment = { id: 456 };
      const position: IPosition = { id: 24466 };
      department.position = position;

      const positionCollection: IPosition[] = [{ id: 12034 }];
      jest.spyOn(positionService, 'query').mockReturnValue(of(new HttpResponse({ body: positionCollection })));
      const expectedCollection: IPosition[] = [position, ...positionCollection];
      jest.spyOn(positionService, 'addPositionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ department });
      comp.ngOnInit();

      expect(positionService.query).toHaveBeenCalled();
      expect(positionService.addPositionToCollectionIfMissing).toHaveBeenCalledWith(positionCollection, position);
      expect(comp.positionsCollection).toEqual(expectedCollection);
    });

    it('Should call shiftDemand query and add missing value', () => {
      const department: IDepartment = { id: 456 };
      const shiftDemand: IShiftDemand = { id: 5103 };
      department.shiftDemand = shiftDemand;

      const shiftDemandCollection: IShiftDemand[] = [{ id: 28470 }];
      jest.spyOn(shiftDemandService, 'query').mockReturnValue(of(new HttpResponse({ body: shiftDemandCollection })));
      const expectedCollection: IShiftDemand[] = [shiftDemand, ...shiftDemandCollection];
      jest.spyOn(shiftDemandService, 'addShiftDemandToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ department });
      comp.ngOnInit();

      expect(shiftDemandService.query).toHaveBeenCalled();
      expect(shiftDemandService.addShiftDemandToCollectionIfMissing).toHaveBeenCalledWith(shiftDemandCollection, shiftDemand);
      expect(comp.shiftDemandsCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const department: IDepartment = { id: 456 };
      const position: IPosition = { id: 24191 };
      department.position = position;
      const shiftDemand: IShiftDemand = { id: 6408 };
      department.shiftDemand = shiftDemand;

      activatedRoute.data = of({ department });
      comp.ngOnInit();

      expect(comp.positionsCollection).toContain(position);
      expect(comp.shiftDemandsCollection).toContain(shiftDemand);
      expect(comp.department).toEqual(department);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDepartment>>();
      const department = { id: 123 };
      jest.spyOn(departmentFormService, 'getDepartment').mockReturnValue(department);
      jest.spyOn(departmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ department });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: department }));
      saveSubject.complete();

      // THEN
      expect(departmentFormService.getDepartment).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(departmentService.update).toHaveBeenCalledWith(expect.objectContaining(department));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDepartment>>();
      const department = { id: 123 };
      jest.spyOn(departmentFormService, 'getDepartment').mockReturnValue({ id: null });
      jest.spyOn(departmentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ department: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: department }));
      saveSubject.complete();

      // THEN
      expect(departmentFormService.getDepartment).toHaveBeenCalled();
      expect(departmentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDepartment>>();
      const department = { id: 123 };
      jest.spyOn(departmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ department });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(departmentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePosition', () => {
      it('Should forward to positionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(positionService, 'comparePosition');
        comp.comparePosition(entity, entity2);
        expect(positionService.comparePosition).toHaveBeenCalledWith(entity, entity2);
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
  });
});
