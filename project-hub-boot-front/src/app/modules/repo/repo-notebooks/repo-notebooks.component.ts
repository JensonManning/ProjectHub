import { Component, inject, OnInit, AfterViewInit, TemplateRef, ViewChild, effect } from '@angular/core';
import { NotebookRepo, NotebookRepoCreate } from '../../../core/interfaces/repo/repo-notebook.interface';
import { RepoNotebookService } from '../../../core/services/repo/repo-notebook.service';
import { LucideAngularModule, Plus, Upload, Search, Pencil, Trash2, X, Check, AlertTriangle, FileText, Save } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { QuillModule } from 'ngx-quill'
import Quill from 'quill'
// Import for vanilla Bootstrap modal
declare var bootstrap: any;


@Component({
  selector: 'app-repo-notebooks',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule, NgxDatatableModule, QuillModule],
  templateUrl: './repo-notebooks.component.html',
  styleUrl: './repo-notebooks.component.scss'
})
export class RepoNotebooksComponent implements OnInit, AfterViewInit {

  // Inject services
  repoNotebookService = inject(RepoNotebookService);
  
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

  // Force the service to load notebooks initially
  constructor() {
    // This will trigger loading notebooks from the API
    this.repoNotebookService.getAllNotebooksResource.reload();
    
    // Create an effect to automatically update the _notebooks array when allNotebooks() changes
    effect(() => {
      this._notebooks = this.repoNotebookService.allNotebooks();
      console.log('Effect triggered: notebooks updated', this._notebooks);
    });
  }

  get notebooks(): NotebookRepo[] {
    return this._notebooks;
  }

  set notebooks(value: NotebookRepo[]) {
    this._notebooks = value;
  }

  private _notebooks: NotebookRepo[] = [];
  
  notebook: NotebookRepo = {
    id: 0,
    name: '',
    description: '',
    content: ''
  };
  selected: NotebookRepo[] = [];

  private notebookModal: any;
  private confirmModal: any;
  private deleteId: number | null = null;
  private temp: NotebookRepo[] = [];
  SelectionType = SelectionType;

  // Quill editor configuration
  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],     // lists
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button
      ['link', 'image']                                  // link and image
    ],
    clipboard: {
      matchVisual: false
    }
  };

  // Quill editor formats (what's allowed)
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

  // Quill editor options
  editorOptions = {
    placeholder: 'Enter notebook content...',
    theme: 'snow'
  };
  
  // Track editor created event
  editorCreated(editor: any) {
    console.log('Editor created:', editor);
  }
  
  ngOnInit(): void {
    // Force reload data
    this.repoNotebookService.getAllNotebooksResource.reload();
  
  }

  // Load notebooks from service
  loadNotebooks(): void {
    // This triggers a reload of the notebooks
    this.repoNotebookService.getAllNotebooksResource.reload();
    console.log('Loading notebooks, current value:', this.repoNotebookService.allNotebooks());
  }

  ngAfterViewInit(): void {
    // Initialize Bootstrap modals after view is initialized
    setTimeout(() => {
      const notebookModalElement = document.getElementById('notebookModal');
      const confirmModalElement = document.getElementById('confirmModal');
      
      if (notebookModalElement) {
        this.notebookModal = new bootstrap.Modal(notebookModalElement);
      } else {
        console.error('notebookModal element not found');
      }
      
      if (confirmModalElement) {
        this.confirmModal = new bootstrap.Modal(confirmModalElement);
      } else {
        console.error('confirmModal element not found');
      }
    }, 100);
  }
  
  // For search filtering
  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();
    
    // Always start with fresh data from the service
    if (!val) {
      this.loadNotebooks();
      return;
    }
    
    // Filter the data from the full dataset
    this._notebooks = this.repoNotebookService.allNotebooks().filter(notebook => 
      notebook.name.toLowerCase().includes(val) ||
      notebook.description.toLowerCase().includes(val) ||
      notebook.id.toString().includes(val)
    );
  }
  
  // Selection handling
  onSelect({ selected }: { selected: NotebookRepo[] }): void {
    this.selected = selected;
    this.repoNotebookService.selectedNotebooks.set(selected);
  }
  
  openNew(): void {
    this.loadNotebooks();  // Reset data
    this.initNotebook();  // Initialize with empty values
    this.notebookModal.show();
  }

  findNotebookIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.repoNotebookService.allNotebooks().length; i++) {
        if (this.repoNotebookService.allNotebooks()[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
  }
  
  // Initialize notebook with empty values
  initNotebook(): void {
    this.notebook = {
      id: 0,
      name: '',
      description: '',
      content: ''
    };
    this.notebookModal.show();
  }
  
  editNotebook(notebook: NotebookRepo): void {
    console.log('Editing notebook:', notebook);
    
    this.notebook = { ...notebook };
		this.repoNotebookService.selectedNotebook.set(notebook);
    
    // Check if the modal is initialized
    if (!this.notebookModal) {
      console.error('Modal not initialized!');
      // Initialize again if needed
      setTimeout(() => {
        const notebookModalElement = document.getElementById('notebookModal');
        if (notebookModalElement) {
          this.notebookModal = new bootstrap.Modal(notebookModalElement);
          this.notebookModal.show();
        }
      }, 100);
    } else {
      this.notebookModal.show();
    }
  }
  
  hideDialog(): void {
    this.notebookModal.hide();
  }
  
  deleteSelectedNotebooks(id: number): void {
    this.deleteId = id;
    this.confirmModal.show();
  }
  
  dismissConfirm(): void {
    this.confirmModal.hide();
    this.deleteId = null;
  }
  
  confirmDelete(): void {
    if (this.deleteId) {
      this.repoNotebookService.deleteNotebook(this.deleteId);
      this.loadNotebooks();  // Reload after delete
    }
    this.dismissConfirm();
  }
  
  saveNotebook(): void {
    this.repoNotebookService.selectedNotebook.set(this.notebook);
    console.log("saving notebook", this.notebook);
    if (this.notebook.id) {
      this.repoNotebookService.editNotebook(this.notebook.id, this.repoNotebookService.selectedNotebook());
    } else {
      this.repoNotebookService.createNotebook(this.notebook);
    }
    
        this.notebook = {
          id: 0,
          name: '',
          description: '',
          content: ''
        };
    this.loadNotebooks();  // Reload after save
    this.hideDialog();
  }
  
  // Reset filter and show all data
  resetFilter(): void {
    this.loadNotebooks();
  }
  
  exportCSV(): void {
    // Implementation in the future, need to find a proper library
  }
}
