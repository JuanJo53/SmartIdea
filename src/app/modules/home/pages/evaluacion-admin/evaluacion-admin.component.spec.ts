import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionAdminComponent } from './evaluacion-admin.component';

describe('EvaluacionAdminComponent', () => {
  let component: EvaluacionAdminComponent;
  let fixture: ComponentFixture<EvaluacionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
