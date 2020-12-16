import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInProjectComponent } from './user-in-project.component';

describe('UserInProjectComponent', () => {
  let component: UserInProjectComponent;
  let fixture: ComponentFixture<UserInProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
