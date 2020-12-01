import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrequesteComponent } from './userrequeste.component';

describe('UserrequesteComponent', () => {
  let component: UserrequesteComponent;
  let fixture: ComponentFixture<UserrequesteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserrequesteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserrequesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
