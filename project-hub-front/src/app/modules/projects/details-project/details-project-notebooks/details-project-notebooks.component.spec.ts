import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProjectNotebooksComponent } from './details-project-notebooks.component';

describe('DetailsProjectNotebooksComponent', () => {
  let component: DetailsProjectNotebooksComponent;
  let fixture: ComponentFixture<DetailsProjectNotebooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsProjectNotebooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsProjectNotebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
