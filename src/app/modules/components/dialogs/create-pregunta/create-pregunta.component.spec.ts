import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePreguntaComponent } from './create-pregunta.component';

describe('CreatePreguntaComponent', () => {
  let component: CreatePreguntaComponent;
  let fixture: ComponentFixture<CreatePreguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePreguntaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
