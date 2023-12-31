import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IPosition } from 'app/entities/position/position.model';
import { PositionService } from 'app/entities/position/service/position.service';
import { IShiftDemand } from 'app/entities/shift-demand/shift-demand.model';
import { ShiftDemandService } from 'app/entities/shift-demand/service/shift-demand.service';
import { DepartmentService } from '../service/department.service';
import { IDepartment } from '../department.model';
import { DepartmentFormService, DepartmentFormGroup } from './department-form.service';

@Component({
  standalone: true,
  selector: 'jhi-department-update',
  templateUrl: './department-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DepartmentUpdateComponent implements OnInit {
  isSaving = false;
  department: IDepartment | null = null;

  positionsCollection: IPosition[] = [];
  shiftDemandsCollection: IShiftDemand[] = [];

  editForm: DepartmentFormGroup = this.departmentFormService.createDepartmentFormGroup();

  constructor(
    protected departmentService: DepartmentService,
    protected departmentFormService: DepartmentFormService,
    protected positionService: PositionService,
    protected shiftDemandService: ShiftDemandService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  comparePosition = (o1: IPosition | null, o2: IPosition | null): boolean => this.positionService.comparePosition(o1, o2);

  compareShiftDemand = (o1: IShiftDemand | null, o2: IShiftDemand | null): boolean => this.shiftDemandService.compareShiftDemand(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.department = department;
      if (department) {
        this.updateForm(department);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const department = this.departmentFormService.getDepartment(this.editForm);
    if (department.id !== null) {
      this.subscribeToSaveResponse(this.departmentService.update(department));
    } else {
      this.subscribeToSaveResponse(this.departmentService.create(department));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartment>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(department: IDepartment): void {
    this.department = department;
    this.departmentFormService.resetForm(this.editForm, department);

    this.positionsCollection = this.positionService.addPositionToCollectionIfMissing<IPosition>(
      this.positionsCollection,
      department.position,
    );
    this.shiftDemandsCollection = this.shiftDemandService.addShiftDemandToCollectionIfMissing<IShiftDemand>(
      this.shiftDemandsCollection,
      department.shiftDemand,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.positionService
      .query({ filter: 'department-is-null' })
      .pipe(map((res: HttpResponse<IPosition[]>) => res.body ?? []))
      .pipe(
        map((positions: IPosition[]) =>
          this.positionService.addPositionToCollectionIfMissing<IPosition>(positions, this.department?.position),
        ),
      )
      .subscribe((positions: IPosition[]) => (this.positionsCollection = positions));

    this.shiftDemandService
      .query({ filter: 'department-is-null' })
      .pipe(map((res: HttpResponse<IShiftDemand[]>) => res.body ?? []))
      .pipe(
        map((shiftDemands: IShiftDemand[]) =>
          this.shiftDemandService.addShiftDemandToCollectionIfMissing<IShiftDemand>(shiftDemands, this.department?.shiftDemand),
        ),
      )
      .subscribe((shiftDemands: IShiftDemand[]) => (this.shiftDemandsCollection = shiftDemands));
  }
}
