import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceByIdComponent } from './reference-by-id.component';

describe('ReferenceByIdComponent', () => {
  let component: ReferenceByIdComponent;
  let fixture: ComponentFixture<ReferenceByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
