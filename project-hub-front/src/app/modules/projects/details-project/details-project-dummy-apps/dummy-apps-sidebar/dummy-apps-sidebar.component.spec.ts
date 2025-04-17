import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyAppsSidebarComponent } from './dummy-apps-sidebar.component';

describe('DummyAppsSidebarComponent', () => {
  let component: DummyAppsSidebarComponent;
  let fixture: ComponentFixture<DummyAppsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DummyAppsSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyAppsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
