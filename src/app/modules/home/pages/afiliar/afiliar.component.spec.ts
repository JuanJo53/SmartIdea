import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliarComponent} from './afiliar.component';

describe(' AfiliarComponent', () => {
  let component: AfiliarComponent;
  let fixture: ComponentFixture<AfiliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiliarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
