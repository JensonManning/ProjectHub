import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoTasksComponent } from './repo-tasks.component';

describe('RepoTasksComponent', () => {
  let component: RepoTasksComponent;
  let fixture: ComponentFixture<RepoTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepoTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
