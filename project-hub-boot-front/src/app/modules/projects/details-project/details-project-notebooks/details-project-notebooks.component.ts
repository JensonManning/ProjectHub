import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../../core/services/project/project.service';
import { DetailNotebooksComponent } from '../detail-notebooks/detail-notebooks.component';

@Component({
  selector: 'app-details-project-notebooks',
  standalone: true,
  imports: [CommonModule, DetailNotebooksComponent],
  template: `
    <div class="container-fluid mt-3">
      <app-detail-notebooks></app-detail-notebooks>
    </div>
  `
})
export class DetailsProjectNotebooksComponent {
  projectService = inject(ProjectService);
} 