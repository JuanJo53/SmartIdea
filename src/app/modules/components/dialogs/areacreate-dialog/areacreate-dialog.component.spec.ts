import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreacreateDialogComponent } from './areacreate-dialog.component';

describe('AreacreateDialogComponent', () => {
  let component: AreacreateDialogComponent;
  let fixture: ComponentFixture<AreacreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreacreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreacreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
