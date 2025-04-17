import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoNotebooksComponent } from './repo-notebooks.component';

describe('RepoNotebooksComponent', () => {
  let component: RepoNotebooksComponent;
  let fixture: ComponentFixture<RepoNotebooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoNotebooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepoNotebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
