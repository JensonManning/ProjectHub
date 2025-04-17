import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyAppsListComponent } from './dummy-apps-list.component';

describe('DummyAppsListComponent', () => {
  let component: DummyAppsListComponent;
  let fixture: ComponentFixture<DummyAppsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DummyAppsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyAppsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
