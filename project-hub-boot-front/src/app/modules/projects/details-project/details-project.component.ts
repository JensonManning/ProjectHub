import { Component, inject } from '@angular/core';
import { ProjectService } from '../../../core/services/project/project.service';
import { CommonModule } from '@angular/common';
import { DetailsProjectOverviewComponent } from './details-project-overview/details-project-overview.component';
import { DetailsProjectTasksComponent } from './details-project-tasks/details-project-tasks.component';
import { DetailsProjectNotebooksComponent } from './details-project-notebooks/details-project-notebooks.component';
import { DetailsProjectResourcesComponent } from './details-project-resources/details-project-resources.component';

@Component({
  selector: 'app-details-project',
  standalone: true,
  imports: [
    CommonModule, 
    DetailsProjectOverviewComponent,
    DetailsProjectTasksComponent,
    DetailsProjectNotebooksComponent,
    DetailsProjectResourcesComponent
  ],
  templateUrl: './details-project.component.html',
  styleUrl: './details-project.component.scss'
})
export class DetailsProjectComponent {
  projectService = inject(ProjectService);
  activeTab = 'overview'; // Default active tab

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
