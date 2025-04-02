import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPhasesComponent } from './dash-phases.component';

describe('DashPhasesComponent', () => {
  let component: DashPhasesComponent;
  let fixture: ComponentFixture<DashPhasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashPhasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashPhasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
