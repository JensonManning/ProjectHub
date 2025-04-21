import { Component, inject, OnInit, AfterViewInit, effect } from '@angular/core';
import { ProjectNotebook, ProjectNotebookCreate, ProjectNotebookSimple } from '../../../../core/interfaces/project/project-notebook.interface';
import { ProjectNotebookService } from '../../../../core/services/project/project-notebook.service';
import { ProjectService } from '../../../../core/services/project/project.service';
import { LucideAngularModule, Plus, Upload, Search, Pencil, Trash2, X, Check, AlertTriangle, FileText, Save } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import Quill from 'quill';

// Import for vanilla Bootstrap modal
declare var bootstrap: any;

@Component({
  selector: 'app-detail-notebooks',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule, QuillModule],
  templateUrl: './detail-notebooks.component.html',
  styleUrl: './detail-notebooks.component.scss'
})
export class DetailNotebooksComponent implements OnInit, AfterViewInit {
  // Inject services
  projectNotebookService = inject(ProjectNotebookService);
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

  // Properties
  notebooks: ProjectNotebook[] = [];
  notebook: ProjectNotebookSimple = {
    id: 0,
    name: '',
    description: '',
    content: '',
    projectId: 0
  };
  selected: ProjectNotebook[] = [];
  
  // Modal references
  private notebookModal: any;
  private viewModal: any;
  private confirmModal: any;
  private deleteId: number | null = null;
  
  // Search filter
  searchText: string = '';

  // Quill editor configuration
  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image']
    ],
    clipboard: {
      matchVisual: false
    }
  };

  quillFormats = [
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'header',
    'list',
    'script',
    'indent',
    'direction',
    'size',
    'color', 'background',
    'font',
    'align',
    'link', 'image', 'video'
  ];

  constructor() {
    // Force load notebooks
    this.loadNotebooks();
    
    // Add effect to reload notebooks when selected project changes
    effect(() => {
      // This will trigger when selectedProject changes
      const project = this.projectService.selectedProject();
      if (project) {
        console.log('Selected project changed, reloading notebooks for project ID:', project.id);
        this.loadNotebooks();
      }
    });
  }

  ngOnInit(): void {
    // Force reload data
    this.loadNotebooks();
  }

  ngAfterViewInit(): void {
    // Initialize Bootstrap modals after view is initialized
    setTimeout(() => {
      const notebookModalElement = document.getElementById('notebookModal');
      const viewModalElement = document.getElementById('viewModal');
      const confirmModalElement = document.getElementById('confirmModal');
      
      if (notebookModalElement) {
        this.notebookModal = new bootstrap.Modal(notebookModalElement);
      } else {
        console.error('notebookModal element not found');
      }
      
      if (viewModalElement) {
        this.viewModal = new bootstrap.Modal(viewModalElement);
      } else {
        console.error('viewModal element not found');
      }
      
      if (confirmModalElement) {
        this.confirmModal = new bootstrap.Modal(confirmModalElement);
      } else {
        console.error('confirmModal element not found');
      }
    }, 100);
  }

  // Load notebooks from service
  loadNotebooks(): void {
    this.projectNotebookService.getAllNotebooksResource.reload();
    // Update local array when data is loaded
    setTimeout(() => {
      const currentProject = this.projectService.selectedProject();
      if (currentProject && currentProject.id) {
        // Filter notebooks for the current project
        this.notebooks = this.projectNotebookService.allNotebooks()
          .filter(notebook => notebook.projectId === currentProject.id);
      } else {
        this.notebooks = [];
      }
    }, 300);
  }

  // For search filtering
  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();
    this.searchText = val;
    
    // Get current project
    const currentProject = this.projectService.selectedProject();
    if (!currentProject || !currentProject.id) {
      this.notebooks = [];
      return;
    }
    
    // First filter by project
    const projectNotebooks = this.projectNotebookService.allNotebooks()
      .filter(notebook => notebook.projectId === currentProject.id);
    
    if (!val) {
      this.notebooks = projectNotebooks;
      return;
    }
    
    // Then filter by search term
    this.notebooks = projectNotebooks.filter(notebook => 
      notebook.name.toLowerCase().includes(val) ||
      notebook.description.toLowerCase().includes(val) ||
      notebook.id.toString().includes(val)
    );
  }

  // Reset search filter
  resetFilter(): void {
    this.searchText = '';
    const currentProject = this.projectService.selectedProject();
    if (currentProject && currentProject.id) {
      this.notebooks = this.projectNotebookService.allNotebooks()
        .filter(notebook => notebook.projectId === currentProject.id);
    } else {
      this.notebooks = [];
    }
  }

  // Initialize notebook with empty values
  openNew(): void {
    const currentProject = this.projectService.selectedProject();
    
    this.notebook = {
      id: 0,
      name: '',
      description: '',
      content: '',
      projectId: currentProject?.id || 0
    };
    this.notebookModal.show();
  }

  // View notebook details
  viewNotebook(notebook: ProjectNotebook): void {
    // Create a ProjectNotebookSimple from ProjectNotebook
    this.notebook = {
      id: notebook.id,
      name: notebook.name,
      description: notebook.description,
      content: notebook.content,
      projectId: notebook.projectId
    };
    this.projectNotebookService.selectedNotebook.set(this.notebook);
    this.viewModal.show();
  }

  // Edit notebook
  editNotebook(notebook: ProjectNotebook): void {
    // Create a ProjectNotebookSimple from ProjectNotebook
    this.notebook = {
      id: notebook.id,
      name: notebook.name,
      description: notebook.description,
      content: notebook.content,
      projectId: notebook.projectId
    };
    this.projectNotebookService.selectedNotebook.set(this.notebook);
    this.notebookModal.show();
  }

  // Save notebook (create or update)
  saveNotebook(): void {
    if (this.notebook.name.trim() && this.notebook.description.trim()) {
      if (this.notebook.id) {
        // Update existing
        this.projectNotebookService.editNotebook(this.notebook.id, this.notebook);
      } else {
        // Create new
        const newNotebook: ProjectNotebookCreate = {
          name: this.notebook.name,
          description: this.notebook.description,
          content: this.notebook.content,
          projectId: this.notebook.projectId
        };
        this.projectNotebookService.createNotebook(newNotebook);
      }
      this.hideDialog();
      this.loadNotebooks();
    }
  }

  // Delete notebook
  deleteNotebook(id: number): void {
    this.deleteId = id;
    this.confirmModal.show();
  }

  // Confirm delete action
  confirmDelete(): void {
    if (this.deleteId) {
      this.projectNotebookService.deleteNotebook(this.deleteId);
      this.confirmModal.hide();
      this.deleteId = null;
      this.loadNotebooks();
    }
  }

  // Dismiss confirm dialog
  dismissConfirm(): void {
    this.confirmModal.hide();
    this.deleteId = null;
  }

  // Hide notebook dialog
  hideDialog(): void {
    this.notebookModal.hide();
  }

  // Hide view dialog
  hideViewDialog(): void {
    this.viewModal.hide();
  }
  
  // Edit from view modal
  editFromView(): void {
    // We already have the notebook loaded in the component
    // Just hide view and show edit
    this.hideViewDialog();
    this.notebookModal.show();
  }
}
