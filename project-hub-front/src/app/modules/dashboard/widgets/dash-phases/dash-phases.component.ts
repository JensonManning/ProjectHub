import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { ProjectService } from '@/core/services/project/project.service';
import { UserService } from '@/core/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-phases',
  standalone: true,
  imports: [CommonModule, DividerModule, ButtonModule],
  templateUrl: './dash-phases.component.html',
  styleUrls: ['./dash-phases.component.scss']
})
export class DashPhasesComponent implements OnInit {
  // Services
  projectService = inject(ProjectService);
  userService = inject(UserService);
  router = inject(Router);

  ngOnInit() {
    // Make sure services are initialized
    this.projectService.getAllProjectsResource.reload();
    this.userService.getCurrentUserResource.reload();

    // Log status values for reference
    console.log('Project status values:');
    console.log('3 = Active project');

    console.log('Phase status values:');
    console.log('0 = Upcoming, 1 = Active, 2 = Completed, 3 = Cancelled, 4 = Delayed, 5 = Postponed, 6 = Late');
  }

  /**
   * Get projects that have an active phase with the specified order
   * @param phaseOrder The order number of the phase to filter by
   * @returns Array of projects that have an active phase with the specified order
   */
  getProjectsWithActivePhase(phaseOrder: number) {
    const allProjects = this.projectService.allProjectsByUser();
    return allProjects.filter(project => 
      project.projectPhases.some(phase => 
        phase.status === 1 && phase.order === phaseOrder
      )
    );
  }

  /**
   * Navigate to the project details page
   * @param projectId The ID of the project to view
   */
  viewProject(projectId: number) {
    this.projectService.selectedProjectId.set(projectId);
    this.router.navigate(['/projects', projectId, 'details']);
  }
}
