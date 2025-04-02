import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTasksCreateComponent } from './dash-tasks-create.component';

describe('DashTasksCreateComponent', () => {
  let component: DashTasksCreateComponent;
  let fixture: ComponentFixture<DashTasksCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashTasksCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashTasksCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
