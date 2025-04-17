import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyAppsCardComponent } from './dummy-apps-card.component';

describe('DummyAppsCardComponent', () => {
  let component: DummyAppsCardComponent;
  let fixture: ComponentFixture<DummyAppsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DummyAppsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyAppsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
