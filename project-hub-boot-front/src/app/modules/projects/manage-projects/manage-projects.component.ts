import { Component, effect, inject, AfterViewInit, OnInit } from '@angular/core';
import { LucideAngularModule, Plus, Upload, Search, Pencil, Trash2, X, Check, AlertTriangle, FileText, Save } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { ProjectService } from '../../../core/services/project/project.service';
import { Project, ProjectCreate, ProjectV2Create } from '../../../core/interfaces/project/project.interface';
import { DatePipe } from '@angular/common';

// Import for vanilla Bootstrap modal
declare var bootstrap: any;

@Component({
  selector: 'app-manage-projects',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule, NgxDatatableModule, DatePipe],
  templateUrl: './manage-projects.component.html',
  styleUrl: './manage-projects.component.scss'
})
export class ManageProjectsComponent implements OnInit, AfterViewInit {
  // Inject services
  projectService = inject(ProjectService);
  
  // Define Lucide icons
  Plus = Plus;
  Upload = Upload;
  Search = Search;
  Pencil = Pencil;
  Trash2 = Trash2;
  X = X;
  Check = Check;
  AlertTriangle = AlertTriangle;
  FileText = FileText;
  Save = Save;

  // Force the service to load projects initially
  constructor() {
    // This will trigger loading projects from the API
    this.projectService.getAllProjectsResource.reload();
    
    // Create an effect to automatically update the _projects array when allProjects() changes
    effect(() => {
      this._projects = this.projectService.allProjects();
      console.log('Effect triggered: projects updated', this._projects);
    });
  }

  get projects(): Project[] {
    return this._projects;
  }

  set projects(value: Project[]) {
    this._projects = value;
  }

  private _projects: Project[] = [];
  
  project: Project = {
    id: 0,
    name: '',
    description: '',
    shortcode: '',
    startDate: new Date(),
    endDate: new Date(),
    status: 0,
    type: 0,
    projectPhases: [],
    projectResources: [],
    projectNotebooks: []
  };
  selected: Project[] = [];

  projectModal: any = null;
  confirmModal: any = null;
  private deleteId: number | null = null;
  private temp: Project[] = [];
  SelectionType = SelectionType;

  ngOnInit(): void {
    // Force reload data
    this.projectService.getAllProjectsResource.reload();
  }

  // Load projects from service
  loadProjects(): void {
    // This triggers a reload of the projects
    this.projectService.getAllProjectsResource.reload();
    console.log('Loading projects, current value:', this.projectService.allProjects());
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called for ManageProjectsComponent');
    this.initializeModals();
  }

  // Separate method for modal initialization to allow for retries
  initializeModals(): void {
    // Initialize Bootstrap modals
    setTimeout(() => {
      try {
        console.log('Attempting to initialize modals...');
        
        const projectModalElement = document.getElementById('projectModal');
        const confirmModalElement = document.getElementById('confirmModal');
        
        console.log('Modal elements found:', 
          { projectModal: !!projectModalElement, confirmModal: !!confirmModalElement });
        
        if (projectModalElement) {
          this.projectModal = new bootstrap.Modal(projectModalElement);
          console.log('projectModal initialized successfully');
        } else {
          console.error('projectModal element not found');
        }
        
        if (confirmModalElement) {
          this.confirmModal = new bootstrap.Modal(confirmModalElement);
          console.log('confirmModal initialized successfully');
        } else {
          console.error('confirmModal element not found');
        }
      } catch (error) {
        console.error('Error initializing modals:', error);
        
        // If bootstrap is not loaded yet, retry after a delay
        if (typeof bootstrap === 'undefined' || !bootstrap.Modal) {
          console.log('Bootstrap not loaded yet, retrying in 1 second...');
          setTimeout(() => this.initializeModals(), 1000);
        }
      }
    }, 500);
  }
  
  // For search filtering
  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();
    
    // Always start with fresh data from the service
    if (!val) {
      this.loadProjects();
      return;
    }
    
    // Filter the data from the full dataset
    this._projects = this.projectService.allProjects().filter(project => 
      project.name.toLowerCase().includes(val) ||
      project.description.toLowerCase().includes(val) ||
      project.shortcode.toLowerCase().includes(val) ||
      project.id.toString().includes(val)
    );
  }
  
  // Selection handling
  onSelect({ selected }: { selected: Project[] }): void {
    this.selected = selected;
    this.projectService.selectedProjects.set(selected);
  }
  
  openNew(): void {
    this.loadProjects();  // Reset data
    this.initProject();  // Initialize with empty values
    
    // Make sure modal is initialized
    if (!this.projectModal) {
      this.initializeModals();
      setTimeout(() => this.showProjectModal(), 500);
    } else {
      this.showProjectModal();
    }
  }
  
  // Safer way to show the project modal
  private showProjectModal(): void {
    try {
      this.projectModal.show();
    } catch (error) {
      console.error('Failed to show project modal:', error);
      // Fallback to manually showing the modal
      const modalElement = document.getElementById('projectModal');
      if (modalElement) {
        this.projectModal = new bootstrap.Modal(modalElement);
        this.projectModal.show();
      }
    }
  }
  
  // Initialize project with empty values
  initProject(): void {
    this.project = {
      id: 0,
      name: '',
      description: '',
      shortcode: '',
      startDate: new Date(),
      endDate: new Date(),
      status: 0,
      type: 0,
      projectPhases: [],
      projectResources: [],
      projectNotebooks: []
    };
  }
  
  editProject(project: Project): void {
    console.log('Original project to edit:', project);
    
    // Make a deep copy of the project for editing
    this.project = JSON.parse(JSON.stringify(project));
    
    // Properly handle the dates
    if (typeof this.project.startDate === 'string') {
      this.project.startDate = new Date(this.project.startDate);
    }
    
    if (typeof this.project.endDate === 'string') {
      this.project.endDate = new Date(this.project.endDate);
    }
    
    // Format dates for input type="date"
    const startDate = this.project.startDate;
    const endDate = this.project.endDate;
    
    // Convert types to number if they're strings
    if (typeof this.project.status === 'string') {
      this.project.status = parseInt(this.project.status as unknown as string, 10);
    }
    
    if (typeof this.project.type === 'string') {
      this.project.type = parseInt(this.project.type as unknown as string, 10);
    }
    
    console.log('Processed project for edit:', this.project);
    
    // Open the modal
    if (!this.projectModal) {
      this.initializeModals();
      setTimeout(() => this.showProjectModal(), 500);
    } else {
      this.showProjectModal();
    }
  }
  
  hideDialog(): void {
    try {
      this.projectModal.hide();
    } catch (error) {
      console.error('Failed to hide project modal:', error);
      // Try alternately
      const modalElement = document.getElementById('projectModal');
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();
      }
    }
  }
  
  deleteSelectedProject(id: number): void {
    console.log('Setting deleteId to:', id);
    this.deleteId = id;
    
    // Make sure modal is initialized
    if (!this.confirmModal) {
      this.initializeModals();
      setTimeout(() => this.showConfirmModal(), 500);
    } else {
      this.showConfirmModal();
    }
  }
  
  // Safer way to show the confirm modal
  private showConfirmModal(): void {
    try {
      this.confirmModal.show();
    } catch (error) {
      console.error('Failed to show confirm modal:', error);
      // Fallback to manually showing the modal
      const modalElement = document.getElementById('confirmModal');
      if (modalElement) {
        this.confirmModal = new bootstrap.Modal(modalElement);
        this.confirmModal.show();
      }
    }
  }
  
  dismissConfirm(): void {
    this.deleteId = null;
    try {
      this.confirmModal.hide();
    } catch (error) {
      console.error('Failed to hide confirm modal:', error);
      // Try alternately
      const modalElement = document.getElementById('confirmModal');
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();
      }
    }
  }
  
  confirmDelete(): void {
    if (this.deleteId) {
      console.log('Deleting project with ID:', this.deleteId);
      
      // Call the service method and handle the response
      this.projectService.deleteProject(this.deleteId);
      
      // Force reload data after deletion
      setTimeout(() => {
        this.projectService.getAllProjectsResource.reload();
        console.log('Forced data reload after delete');
      }, 500);
      
      this.dismissConfirm();
    } else {
      console.error('No deleteId set, cannot delete project');
    }
  }
  
  saveProject(): void {
    console.log('Saving project:', this.project);
    
    // Ensure dates are properly formatted
    const startDate = this.project.startDate instanceof Date 
      ? this.project.startDate 
      : new Date(this.project.startDate);
      
    const endDate = this.project.endDate instanceof Date 
      ? this.project.endDate 
      : new Date(this.project.endDate);
    
    // Create project create model to send to API
    const projectToSave: ProjectV2Create = {
      name: this.project.name,
      description: this.project.description,
      shortcode: this.project.shortcode,
      startDate: startDate,
      endDate: endDate,
      status: Number(this.project.status),
      type: Number(this.project.type)
    };
    
    console.log('Processed project to save:', projectToSave);
    
    if (this.project.id) {
      // Editing existing project
      console.log('Updating project with ID:', this.project.id);
      this.projectService.editProjectForm(this.project.id, projectToSave).subscribe({
        next: () => {
          console.log('Project updated successfully');
          this.projectService.getAllProjectsResource.reload();
          this.hideDialog();
        },
        error: (error) => {
          console.error('Error updating project:', error);
        }
      });
    } else {
      // Creating new project
      console.log('Creating new project');
      this.projectService.createProjectForm(projectToSave).subscribe({
        next: () => {
          console.log('Project created successfully');
          this.projectService.getAllProjectsResource.reload();
          this.hideDialog();
        },
        error: (error) => {
          console.error('Error creating project:', error);
        }
      });
    }
  }
  
  resetFilter(): void {
    this.loadProjects();
  }
  
  exportCSV(): void {
    // Implement CSV export functionality
    console.log('Export to CSV');
  }
  
  // Helper function to get status text
  getStatusText(status: number): string {
    switch(status) {
      case 0: return 'Not Started';
      case 1: return 'In Progress';
      case 2: return 'On Hold';
      case 3: return 'Active';
      case 4: return 'Completed';
      case 5: return 'Cancelled';
      default: return 'Unknown';
    }
  }
  
  // Helper function to get project type text
  getProjectTypeText(type: number): string {
    switch(type) {
      case 0: return 'Standard';
      case 1: return 'Research';
      case 2: return 'Development';
      case 3: return 'Maintenance';
      default: return 'Unknown';
    }
  }
  
  // Format date for display in the date inputs
  formatDateForInput(date: Date | string): string {
    if (!date) return '';
    
    const d = date instanceof Date ? date : new Date(date);
    return d.toISOString().substring(0, 10);
  }
}
