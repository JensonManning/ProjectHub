import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailNotebooksComponent } from './detail-notebooks.component';

describe('DetailNotebooksComponent', () => {
  let component: DetailNotebooksComponent;
  let fixture: ComponentFixture<DetailNotebooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailNotebooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailNotebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
