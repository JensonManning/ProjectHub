import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoResourcesComponent } from './repo-resources.component';

describe('RepoResourcesComponent', () => {
  let component: RepoResourcesComponent;
  let fixture: ComponentFixture<RepoResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoResourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepoResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
