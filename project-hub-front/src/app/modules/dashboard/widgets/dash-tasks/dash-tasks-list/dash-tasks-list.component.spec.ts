import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTasksListComponent } from './dash-tasks-list.component';

describe('DashTasksListComponent', () => {
  let component: DashTasksListComponent;
  let fixture: ComponentFixture<DashTasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashTasksListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
