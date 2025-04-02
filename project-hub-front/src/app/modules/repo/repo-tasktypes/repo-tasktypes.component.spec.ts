import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoTasktypesComponent } from './repo-tasktypes.component';

describe('RepoTasktypesComponent', () => {
  let component: RepoTasktypesComponent;
  let fixture: ComponentFixture<RepoTasktypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoTasktypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepoTasktypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
