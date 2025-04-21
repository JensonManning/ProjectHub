import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoTaskTypesComponent } from './repo-task-types.component';

describe('RepoTaskTypesComponent', () => {
  let component: RepoTaskTypesComponent;
  let fixture: ComponentFixture<RepoTaskTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoTaskTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepoTaskTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
