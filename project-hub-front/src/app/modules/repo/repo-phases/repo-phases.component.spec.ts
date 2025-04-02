import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoPhasesComponent } from './repo-phases.component';

describe('RepoPhasesComponent', () => {
  let component: RepoPhasesComponent;
  let fixture: ComponentFixture<RepoPhasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoPhasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepoPhasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
