import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoCategoryComponent } from './repo-category.component';

describe('RepoCategoryComponent', () => {
  let component: RepoCategoryComponent;
  let fixture: ComponentFixture<RepoCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepoCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
