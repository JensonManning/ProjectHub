import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProjectTasksComponent } from './details-project-tasks.component';

describe('DetailsProjectTasksComponent', () => {
  let component: DetailsProjectTasksComponent;
  let fixture: ComponentFixture<DetailsProjectTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsProjectTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsProjectTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
