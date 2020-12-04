import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaeditDialogComponent } from './areaedit-dialog.component';

describe('AreaeditDialogComponent', () => {
  let component: AreaeditDialogComponent;
  let fixture: ComponentFixture<AreaeditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaeditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaeditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
