import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSkillComponent } from './create-skill.component';

describe('CreateSkillComponent', () => {
  let component: CreateSkillComponent;
  let fixture: ComponentFixture<CreateSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSkillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
