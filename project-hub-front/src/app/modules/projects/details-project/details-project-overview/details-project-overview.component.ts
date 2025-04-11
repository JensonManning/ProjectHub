import { Component, computed, inject } from '@angular/core';
import { ProjectService } from '@/core/services/project/project.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProjectPhase } from '@/core/interfaces/project/project-phase.interface';
import { ProjectTask } from '@/core/interfaces/project/project-task.interface';

@Component({
    selector: 'app-details-project-overview',
    imports: [
      CommonModule,
      CardModule,
      TagModule,
      ProgressBarModule
    ],
    templateUrl: './details-project-overview.component.html',
    styleUrls: ['./details-project-overview.component.scss']
})
export class DetailsProjectOverviewComponent {
    projectService = inject(ProjectService);
    projectDetails = this.projectService.projectDetails();

    completedTasks = computed(() => {
        return this.projectService.projectDetails()?.projectPhases?.reduce((acc, phase) => {
            return acc + phase.projectTasks.filter(t => t.status === 2).length;
        }, 0) ?? 0;
    });

    openTasks = computed(() => {
        return this.projectService.projectDetails()?.projectPhases?.reduce((acc, phase) => { 
            return acc + phase.projectTasks?.filter(t => t.status !== 2).length; 
        }, 0) ?? 0;
    });

    currentPhase = computed(() => {
        const phases = this.projectService.projectDetails()?.projectPhases || [];
        if (!phases.length) return null;
        
        // Find the active phase (status 1)
        const activePhase = phases.find(p => p.status === 1);
        if (activePhase) return activePhase;
        
        // If no active phase, get the upcoming phase with the earliest start date
        const upcomingPhases = phases.filter(p => p.status === 0);
        if (upcomingPhases.length) {
            return upcomingPhases.sort((a, b) => 
                new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
            )[0];
        }
        
        // If no upcoming phases, return the most recently completed phase
        return phases
            .filter(p => p.status === 2)
            .sort((a, b) => 
                new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
            )[0] || phases[0];
    });

    getTasksByStatus(status: number): number {
        return this.projectService.projectDetails()?.projectPhases?.reduce((acc, phase) => {
            return acc + phase.projectTasks.filter(t => t.status === status).length;
        }, 0) ?? 0;
    }

    getTasksProgress(): number {
        const total = this.completedTasks() + this.openTasks();
        if (total === 0) return 0;
        return Math.round((this.completedTasks() / total) * 100);
    }
    
    getPhaseProgress(phase: ProjectPhase | null): number {
        if (!phase || !phase.projectTasks || phase.projectTasks.length === 0) return 0;
        
        const completedTasks = phase.projectTasks.filter(t => t.status === 2).length;
        return Math.round((completedTasks / phase.projectTasks.length) * 100);
    }

    getPhaseStatusLabel(phase: ProjectPhase): string {
        if (!phase) return 'Unknown';
        
        switch (phase.status) {
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

    getPhaseStatusSeverity(phase: ProjectPhase): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
        if (!phase) return 'info';
        
        switch (phase.status) {
            case 0: return 'info';
            case 1: return 'warn';
            case 2: return 'success';
            case 3: return 'danger';
            case 4: return 'warn';
            case 5: return 'danger';
            case 6: return 'danger';
            default: return 'info';
        }
    }

    getProjectStatusLabel(): string {
        const status = this.projectService.projectDetails()?.status;
        
        switch (status) {
            case 0: return 'Unknown';
            case 1: return 'Sale Pending';
            case 2: return 'Upcoming';
            case 3: return 'Active';
            case 4: return 'Completed';
            case 5: return 'Cancelled';
            case 6: return 'Delayed';
            case 7: return 'Postponed';
            case 8: return 'Late';
            default: return 'Unknown';
        }
    }

    getProjectTypeLabel(): string {
        const type = this.projectService.projectDetails()?.type;
        
        switch (type) {
            case 0: return 'Unknown';
            case 1: return 'Cloud Plus';
            case 2: return 'Cloud Only';
            case 3: return 'Merger';
            case 4: return 'Exit';
            default: return 'Unknown';
        }
    }

    getProjectPhaseSeverity(): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
        const status = this.projectService.projectDetails()?.status;
        
        switch (status) {
            case 0: return 'info';      // Unknown
            case 1: return 'info';      // Sale Pending
            case 2: return 'info';      // Upcoming
            case 3: return 'warn';      // Active
            case 4: return 'success';   // Completed
            case 5: return 'danger';    // Cancelled
            case 6: return 'warn';      // Delayed
            case 7: return 'danger';    // Postponed
            case 8: return 'danger';    // Late
            default: return 'info';
        }
    }
}
