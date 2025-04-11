import { ProjectService } from '@/core/services/project/project.service';
import { Component, inject } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { DetailsProjectResourcesComponent } from "./details-project-resources/details-project-resources.component";
import { DetailsProjectOverviewComponent } from "./details-project-overview/details-project-overview.component";
import { DetailsProjectTasksComponent } from "./details-project-tasks/details-project-tasks.component";
import { DetailsProjectNotebooksComponent } from "./details-project-notebooks/details-project-notebooks.component";

@Component({
  selector: 'app-details-project',
  imports: [TabsModule, DetailsProjectResourcesComponent, DetailsProjectOverviewComponent, DetailsProjectTasksComponent, DetailsProjectNotebooksComponent],
  templateUrl: './details-project.component.html',
  styleUrl: './details-project.component.scss'
})
export class DetailsProjectComponent {
  projectService = inject(ProjectService)
}
