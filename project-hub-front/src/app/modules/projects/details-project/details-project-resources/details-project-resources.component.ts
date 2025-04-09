import { ProjectService } from '@/core/services/project/project.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-details-project-resources',
  imports: [],
  templateUrl: './details-project-resources.component.html',
  styleUrl: './details-project-resources.component.scss'
})
export class DetailsProjectResourcesComponent {
  projectService = inject(ProjectService);

  
}
