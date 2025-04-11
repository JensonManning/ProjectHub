import { PhlayoutService } from '@/core/services/layout/phlayout.service';
import { ProjectService } from '@/core/services/project/project.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
	selector: '[app-search]',
	imports: [DialogModule, InputTextModule, AutoFocusModule, AutoCompleteModule, FormsModule, ButtonModule],
	templateUrl: './search.component.html',
	styleUrl: './search.component.scss'
})
export class SearchComponent {
	layoutService = inject(PhlayoutService);
	projectService = inject(ProjectService);
	router = inject(Router);

    selectedProject: any;
    filteredProjects: any[] = [];

    toggleSearchBar() {
        this.layoutService.layoutState.update((value) => ({ ...value, searchBarActive: !value.searchBarActive }));
    }

    get searchBarActive(): boolean {
        return this.layoutService.layoutState().searchBarActive;
    }

    set searchBarActive(_val: boolean) {
        this.layoutService.layoutState.update((prev) => ({ ...prev, searchBarActive: _val }));
    }

    get allProjects(): any[] {
        return this.projectService.allProjects();
    }

    filterProjects(event: any) {
        const query = event.query.toLowerCase();
        this.filteredProjects = this.allProjects.filter(project => 
            project.name.toLowerCase().includes(query) || 
            project.shortcode.toLowerCase().includes(query)
        );
    }

    onProjectSelect(event: any) {
        // The event parameter is the selected project object itself in PrimeNG AutoComplete
        console.log('Project selected:', event);
        this.selectedProject = event.value;

        if(this.selectedProject.id != null) {
            this.goToSelectedProject();
        }
    }

    goToSelectedProject() {
        if (this.selectedProject && this.selectedProject.id != null) {
            // Close the search dialog
            this.searchBarActive = false;
            
            // Set the selected project ID in the service
            this.projectService.selectedProjectId.set(this.selectedProject.id);
            
            // Navigate to the project details page
            this.router.navigate(['/projects', this.selectedProject.id, 'details']);
            
            // Reset the selected project after navigation
            setTimeout(() => {
                this.selectedProject = null;
            }, 300);
        }
    }
}
