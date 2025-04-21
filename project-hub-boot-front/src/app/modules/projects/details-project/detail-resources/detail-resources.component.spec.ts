import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailResourcesComponent } from './detail-resources.component';

describe('DetailResourcesComponent', () => {
  let component: DetailResourcesComponent;
  let fixture: ComponentFixture<DetailResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailResourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
