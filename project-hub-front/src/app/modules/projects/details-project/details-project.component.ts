import { ProjectService } from '@/core/services/project/project.service';
import { Component, inject } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { DetailsProjectResourcesComponent } from "./details-project-resources/details-project-resources.component";

@Component({
  selector: 'app-details-project',
  imports: [TabsModule, DetailsProjectResourcesComponent],
  templateUrl: './details-project.component.html',
  styleUrl: './details-project.component.scss'
})
export class DetailsProjectComponent {
  projectService = inject(ProjectService)
}
