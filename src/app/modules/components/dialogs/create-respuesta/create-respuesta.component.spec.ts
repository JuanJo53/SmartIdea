import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRespuestaComponent } from './create-respuesta.component';

describe('CreateRespuestaComponent', () => {
  let component: CreateRespuestaComponent;
  let fixture: ComponentFixture<CreateRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRespuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
