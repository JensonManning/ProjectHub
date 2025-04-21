import { Component, inject, OnInit, AfterViewInit, TemplateRef, ViewChild, effect } from '@angular/core';
import { LucideAngularModule, Plus, Upload, Search, Pencil, Trash2, X, Check, AlertTriangle, FileText, Save } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { RepoPhaseService } from '../../../core/services/repo/repo-phase.service';
import { PhaseRepo } from '../../../core/interfaces/repo/repo-phase.interface';
import { NotebookRepo } from '../../../core/interfaces/repo/repo-notebook.interface';

// Import for vanilla Bootstrap modal
declare var bootstrap: any;
@Component({
  selector: 'app-repo-phases',
  imports: [CommonModule, LucideAngularModule, FormsModule, NgxDatatableModule],
  templateUrl: './repo-phases.component.html',
  styleUrl: './repo-phases.component.scss'
})
export class RepoPhasesComponent {
  // Inject services
  repoPhaseService = inject(RepoPhaseService);

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
    this.repoPhaseService.getAllPhasesResource.reload();
    
    // Create an effect to automatically update the _notebooks array when allNotebooks() changes
    effect(() => {
      this._phases = this.repoPhaseService.allPhases();
      console.log('Effect triggered: phases updated', this._phases);
    });
  }

  get phases(): PhaseRepo[] {
    return this._phases;
  }

  set phases(value: PhaseRepo[]) {
    this._phases = value;
  }

  private _phases: PhaseRepo[] = [];
  
  phase: PhaseRepo = {
    id: 0,
    name: '',
    description: '',
    order: 0
  };
  selected: PhaseRepo[] = [];

  private phaseModal: any;
  private confirmModal: any;
  private deleteId: number | null = null;
  private temp: PhaseRepo[] = [];
  SelectionType = SelectionType; 

  ngOnInit(): void {
    // Force reload data
    this.repoPhaseService.getAllPhasesResource.reload();
  }

  // Load notebooks from service
  loadPhases(): void {
    // This triggers a reload of the notebooks
    this.repoPhaseService.getAllPhasesResource.reload();
    console.log('Loading phases, current value:', this.repoPhaseService.allPhases());
  }

  ngAfterViewInit(): void {
    // Initialize Bootstrap modals after view is initialized
    setTimeout(() => {
      const phaseModalElement = document.getElementById('phaseModal');
      const confirmModalElement = document.getElementById('confirmModal');
      
      if (phaseModalElement) {
        this.phaseModal = new bootstrap.Modal(phaseModalElement);
      } else {
        console.error('phaseModal element not found');
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
      this.loadPhases();
      return;
    }
    
    // Filter the data from the full dataset
    this._phases = this.repoPhaseService.allPhases().filter(phase => 
      phase.name.toLowerCase().includes(val) ||
      phase.description.toLowerCase().includes(val) ||
      phase.id.toString().includes(val)
    );
  }

  // Selection handling
  onSelect({ selected }: { selected: PhaseRepo[] }): void {
    this.selected = selected;
    this.repoPhaseService.selectedPhases.set(selected);
  }
  
  openNew(): void {
    this.loadPhases();  // Reset data
    this.initPhase();  // Initialize with empty values
    this.phaseModal.show();
  }

  initPhase(): void {
    this.phase = {
      id: 0,
      name: '',
      description: '',
      order: 0
    };
  }

  editPhase(phase: PhaseRepo): void {
    console.log('Editing phase:', phase);
    
    this.phase = { ...phase };
		this.repoPhaseService.selectedPhase.set(phase);
    
    // Check if the modal is initialized
    if (!this.phaseModal) {
      console.error('Modal not initialized!');
      // Initialize again if needed
      setTimeout(() => {
        const phaseModalElement = document.getElementById('phaseModal');
        if (phaseModalElement) {
          this.phaseModal = new bootstrap.Modal(phaseModalElement);
          this.phaseModal.show();
        }
      }, 100);
    } else {
      this.phaseModal.show();
    }
  }

  hideDialog(): void {
    this.phaseModal.hide();
  }

  deleteSelectedPhases(id: number): void {
    this.deleteId = id;
    this.confirmModal.show();
  }
  
  dismissConfirm(): void {
    this.confirmModal.hide();
    this.deleteId = null;
  }

  confirmDelete(): void {
    if (this.deleteId) {
      this.repoPhaseService.deletePhase(this.deleteId);
      this.loadPhases();  // Reload after delete
    }
    this.dismissConfirm();
  }

  savePhase(): void {
    this.repoPhaseService.selectedPhase.set(this.phase);
    console.log("saving phase", this.phase);
    if (this.phase.id) {
      this.repoPhaseService.editPhase(this.phase.id, this.repoPhaseService.selectedPhase());
    } else {
      this.repoPhaseService.createPhase(this.phase);
    }
    
        this.phase = {
          id: 0,
          name: '',
          description: '',
          order: 0
        };
    this.loadPhases();  // Reload after save
    this.hideDialog();
  }
  
  // Reset filter and show all data
  resetFilter(): void {
    this.loadPhases();
  }
  
  exportCSV(): void {
    // Implementation in the future, need to find a proper library
  }
}