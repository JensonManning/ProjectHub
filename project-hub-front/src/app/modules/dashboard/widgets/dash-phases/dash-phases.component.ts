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

  }

  /**
   * Get projects that have an active phase with the specified order
   * @param phaseOrder The order number of the phase to filter by
   * @returns Array of projects that have an active phase with the specified order
   */
  getProjectsWithActivePhase(phaseOrder: number) {
    const allProjects = this.projectService.allProjectsByUser();

    
    // Track all unique phase statuses we find
    const foundStatuses = new Set<number>();
    
    const filteredProjects = allProjects.filter(project => {
      
      // Record all statuses we find
      project.projectPhases.forEach(phase => foundStatuses.add(phase.status));
      
      const matchingPhases = project.projectPhases.filter(phase => {
        const matches = phase.status === 1 && phase.order === phaseOrder;
        return matches;
      });
      
      const hasActivePhase = matchingPhases.length > 0;
      return hasActivePhase;
    });
  
    return filteredProjects;
  }

  private getStatusName(status: number): string {
    switch(status) {
      case 0: return 'Upcoming';
      case 1: return 'Active';
      case 2: return 'Completed';
      case 3: return 'Cancelled';
      case 4: return 'Delayed';
      case 5: return 'Postponed';
      case 6: return 'Late';
      default: return 'Unknown';
    }
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
