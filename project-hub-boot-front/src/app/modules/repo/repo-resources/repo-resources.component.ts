import { Component, inject, OnInit, AfterViewInit, TemplateRef, ViewChild, effect } from '@angular/core';
import { ResourceRepo, ResourceRepoNoTasks } from '../../../core/interfaces/repo/repo-resource.interface';
import { LucideAngularModule, Plus, Upload, Search, Pencil, Trash2, X, Check, AlertTriangle, FileText, Save } from 'lucide-angular';
import { RepoResourceService } from '../../../core/services/repo/repo-resource.service';
import { NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Import for vanilla Bootstrap modal
declare var bootstrap: any;
@Component({
  selector: 'app-repo-resources',
  imports: [CommonModule, LucideAngularModule, FormsModule, NgxDatatableModule],
  templateUrl: './repo-resources.component.html',
  styleUrl: './repo-resources.component.scss'
})
export class RepoResourcesComponent implements OnInit, AfterViewInit {
  // Inject services
  repoResourceService = inject(RepoResourceService);
  
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
    this.repoResourceService.getAllResourcesResource.reload();
    
    // Create an effect to automatically update the _notebooks array when allNotebooks() changes
    effect(() => {
      this._resources = this.repoResourceService.allResources();
      console.log('Effect triggered: resources updated', this._resources);
    });
  }

  get resources(): ResourceRepoNoTasks[] {
    return this._resources;
  }

  set resources(value: ResourceRepoNoTasks[]) {
    this._resources = value;
  }

  private _resources: ResourceRepoNoTasks[] = [];
  
  resource: ResourceRepoNoTasks = {
    id: 0,
    name: '',
  };
  selected: ResourceRepoNoTasks[] = [];

  private resourceModal: any;
  private confirmModal: any;
  private deleteId: number | null = null;
  private temp: ResourceRepoNoTasks[] = [];
  SelectionType = SelectionType;
  ngOnInit(): void {
    // Force reload data
    this.repoResourceService.getAllResourcesResource.reload();
  
  }

  // Load notebooks from service
  loadResources(): void {
    // This triggers a reload of the resources
    this.repoResourceService.getAllResourcesResource.reload();
    console.log('Loading resources, current value:', this.repoResourceService.allResources());
  }

  ngAfterViewInit(): void {
    // Initialize Bootstrap modals after view is initialized
    setTimeout(() => {
      const resourceModalElement = document.getElementById('resourceModal');
      const confirmModalElement = document.getElementById('confirmModal');
      
      if (resourceModalElement) {
        this.resourceModal = new bootstrap.Modal(resourceModalElement);
      } else {
        console.error('resourceModal element not found');
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
      this.loadResources();
      return;
    }
    
    // Filter the data from the full dataset
    this._resources = this.repoResourceService.allResources().filter(resource => 
      resource.name.toLowerCase().includes(val) ||
      resource.id.toString().includes(val)
    );
  }
  
  // Selection handling
  onSelect({ selected }: { selected: ResourceRepoNoTasks[] }): void {
    this.selected = selected;
    this.repoResourceService.selectedResources.set(selected);
  }
  
  openNew(): void {
    this.loadResources();  // Reset data
    this.initResource();  // Initialize with empty values
    this.resourceModal.show();
  }

  findResourceIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.repoResourceService.allResources().length; i++) {
        if (this.repoResourceService.allResources()[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
  }
  
  // Initialize notebook with empty values
  initResource(): void {
    this.resource = {
      id: 0,
      name: '',
    };
    this.resourceModal.show();
  }
  
  editResource(resource: ResourceRepoNoTasks): void {
    console.log('Editing resource:', resource);
    
    this.resource = { ...resource };
		this.repoResourceService.selectedResource.set(resource);
    
    // Check if the modal is initialized
    if (!this.resourceModal) {
      console.error('Modal not initialized!');
      // Initialize again if needed
      setTimeout(() => {
        const resourceModalElement = document.getElementById('resourceModal');
        if (resourceModalElement) {
          this.resourceModal = new bootstrap.Modal(resourceModalElement);
          this.resourceModal.show();
        }
      }, 100);
    } else {
      this.resourceModal.show();
    }
  }
  
  hideDialog(): void {
    this.resourceModal.hide();
  }
  
  deleteSelectedResources(id: number): void {
    this.deleteId = id;
    this.confirmModal.show();
  }
  
  dismissConfirm(): void {
    this.confirmModal.hide();
    this.deleteId = null;
  }
  
  confirmDelete(): void {
    if (this.deleteId) {
      this.repoResourceService.deleteResource(this.deleteId);
      this.loadResources();  // Reload after delete
    }
    this.dismissConfirm();
  }
  
  saveResource(): void {
    this.repoResourceService.selectedResource.set(this.resource);
    console.log("saving resource", this.resource);
    if (this.resource.id) {
      this.repoResourceService.editResource(this.resource.id, this.repoResourceService.selectedResource());
    } else {
      this.repoResourceService.createResource(this.resource);
    }
    
        this.resource = {
          id: 0,
          name: '',
        };
    this.loadResources();  // Reload after save
    this.hideDialog();
  }
  
  // Reset filter and show all data
  resetFilter(): void {
    this.loadResources();
  }
  
  exportCSV(): void {
    // Implementation in the future, need to find a proper library
  }
}
