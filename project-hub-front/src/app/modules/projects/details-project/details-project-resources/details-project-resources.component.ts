import { ProjectResource } from '@/core/interfaces/project/project-resource.interface';
import { ProjectResourceService } from '@/core/services/project/project-resource.service';
import { ProjectService } from '@/core/services/project/project.service';
import { Component, inject } from '@angular/core';
import { B } from 'node_modules/@angular/cdk/bidi-module.d-f8648621';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-details-project-resources',
  imports: [ButtonModule],
  templateUrl: './details-project-resources.component.html',
  styleUrl: './details-project-resources.component.scss'
})
export class DetailsProjectResourcesComponent {
  projectService = inject(ProjectService);
  projectResourceService = inject(ProjectResourceService);

  editResource(id: number, resource: ProjectResource) {
    this.projectResourceService.editResource(id, resource).subscribe({
      next: (res) => {
        console.log(res);
        this.projectService.getAllProjectsResource.reload();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  
}
