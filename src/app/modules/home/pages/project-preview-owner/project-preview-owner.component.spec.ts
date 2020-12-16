import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPreviewOwnerComponent } from './project-preview-owner.component';

describe('ProjectPreviewOwnerComponent', () => {
  let component: ProjectPreviewOwnerComponent;
  let fixture: ComponentFixture<ProjectPreviewOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectPreviewOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPreviewOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
