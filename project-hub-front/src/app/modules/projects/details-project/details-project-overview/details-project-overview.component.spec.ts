import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProjectOverviewComponent } from './details-project-overview.component';

describe('DetailsProjectOverviewComponent', () => {
  let component: DetailsProjectOverviewComponent;
  let fixture: ComponentFixture<DetailsProjectOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsProjectOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsProjectOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
