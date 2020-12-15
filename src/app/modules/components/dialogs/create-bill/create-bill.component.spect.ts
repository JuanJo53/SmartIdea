import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBillComponent } from './create-bill.component';

describe('CreateBillComponent', () => {
  let component: CreateBillComponent;
  let fixture: ComponentFixture<CreateBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBillComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
