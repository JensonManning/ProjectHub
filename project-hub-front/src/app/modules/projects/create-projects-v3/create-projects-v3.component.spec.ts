import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectsV3Component } from './create-projects-v3.component';

describe('CreateProjectsV3Component', () => {
  let component: CreateProjectsV3Component;
  let fixture: ComponentFixture<CreateProjectsV3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProjectsV3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProjectsV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
