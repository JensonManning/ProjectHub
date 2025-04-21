import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoTaskCategoriesComponent } from './repo-task-categories.component';

describe('RepoTaskCategoriesComponent', () => {
  let component: RepoTaskCategoriesComponent;
  let fixture: ComponentFixture<RepoTaskCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoTaskCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepoTaskCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
