import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProjectResourcesComponent } from './details-project-resources.component';

describe('DetailsProjectResourcesComponent', () => {
  let component: DetailsProjectResourcesComponent;
  let fixture: ComponentFixture<DetailsProjectResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsProjectResourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsProjectResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
