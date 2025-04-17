import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProjectDummyAppsComponent } from './details-project-dummy-apps.component';

describe('DetailsProjectDummyAppsComponent', () => {
  let component: DetailsProjectDummyAppsComponent;
  let fixture: ComponentFixture<DetailsProjectDummyAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsProjectDummyAppsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsProjectDummyAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
