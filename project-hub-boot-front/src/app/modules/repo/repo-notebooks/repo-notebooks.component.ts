import { Component, inject, OnInit, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { NotebookRepo } from '../../../core/interfaces/repo/repo-notebook.interface';
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

  notebooks: NotebookRepo[] = [];
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
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image', 'video']
    ],
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: function (searchTerm: any, renderList: any, mentionChar: any) {
        let values;
        if (mentionChar === "@") {
          values = [
            { id: 1, value: "Fredrik Sundqvist" },
            { id: 2, value: "Patrik Sjölin" }
          ];
        } else {
          values = [
            { id: 1, value: "Task1" },
            { id: 2, value: "Task2" }
          ]
        }

        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = [];
          for (let i = 0; i < values.length; i++)
            if (
              ~values[i].value
                .toLowerCase()
                .indexOf(searchTerm.toLowerCase())
            )
              matches.push(values[i]);
          renderList(matches, searchTerm);
        }
      }
    }
  };

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
    this.notebooks = this.repoNotebookService.allNotebooks();
    this.temp = [...this.notebooks];
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
    
    // Filter the data
    const temp = this.temp.filter(function(d) {
      return (
        d.name.toLowerCase().indexOf(val) !== -1 ||
        d.description.toLowerCase().indexOf(val) !== -1 ||
        d.id.toString().indexOf(val) !== -1 ||
        !val
      );
    });
    
    // Update the data
    this.notebooks = temp;
  }
  
  // Selection handling
  onSelect({ selected }: { selected: NotebookRepo[] }): void {
    this.selected = selected;
    this.repoNotebookService.selectedNotebooks.set(selected);
  }
  
  openNew(): void {
    this.notebook = {
      id: 0,
      name: '',
      description: '',
      content: ''
    };
    this.notebookModal.show();
  }
  
  editNotebook(notebook: NotebookRepo): void {
    this.notebook = { ...notebook };
    this.notebookModal.show();
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
      this.notebooks = this.repoNotebookService.allNotebooks();
      this.temp = [...this.notebooks];
    }
    this.dismissConfirm();
  }
  
  saveNotebook(): void {
    if (this.notebook.id) {
      this.repoNotebookService.editNotebook(this.notebook.id, this.notebook);
    } else {
      this.repoNotebookService.createNotebook(this.notebook);
    }
    
    this.notebooks = this.repoNotebookService.allNotebooks();
    this.temp = [...this.notebooks];
    this.hideDialog();
  }
  
  exportCSV(): void {
    // Implementation in the future, need to find a proper library
  }
}
