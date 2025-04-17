import { Component, ElementRef, inject, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { LucideAngularModule, ChevronLeft, Search, User, X } from 'lucide-angular';
import { ProjectService } from '../../core/services/project/project.service';
import { UserService } from '../../core/services/user/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Project } from '../../core/interfaces/project/project.interface';
import { Tooltip } from 'bootstrap';

@Component({
  selector: '[app-topbar]',
  standalone: true,
  imports: [LucideAngularModule, FormsModule, CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef;

  ChevronLeft = ChevronLeft;
  Search = Search;
  User = User;
  X = X;

  projectService = inject(ProjectService);
  userService = inject(UserService);
  router = inject(Router);
  
  searchTerm = '';
  showSearch = false;
  filteredProjects: Project[] = [];
  tooltipList: Tooltip[] = [];

  ngAfterViewInit() {
    // Initialize tooltips after a small delay to ensure DOM is ready
    setTimeout(() => {
      this.initTooltips();
    }, 100);
  }

  ngOnDestroy() {
    this.disposeTooltips();
  }

  initTooltips() {
    // Dispose any existing tooltips
    this.disposeTooltips();
    
    // Initialize tooltips using an array to ensure all tooltips are created
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      const tooltip = new Tooltip(tooltipTriggerEl, {
        placement: 'bottom',
        trigger: 'hover focus',
        container: 'body'
      });
      this.tooltipList.push(tooltip);
    });
    
    console.log(`Initialized ${tooltipTriggerList.length} tooltips`);
  }

  disposeTooltips() {
    // Dispose all tooltips to prevent memory leaks
    this.tooltipList.forEach(tooltip => {
      tooltip.dispose();
    });
    this.tooltipList = [];
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      // Give time for the input to appear in the DOM
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 0);
    } else {
      this.searchTerm = '';
      this.filteredProjects = [];
    }
  }

  onSearchInput() {
    if (this.searchTerm.trim() === '') {
      this.filteredProjects = [];
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.filteredProjects = this.projectService.allProjects().filter(project => 
      project.name.toLowerCase().includes(term) || 
      project.shortcode.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term)
    );
  }

  selectProject(project: Project) {
    this.router.navigate(['/project', project.id]);
    this.toggleSearch();
  }
}
