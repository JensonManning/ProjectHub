import { RepoPhaseService } from '@/core/services/repo/repo-phase.service';
import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { SkeletonModule } from 'primeng/skeleton';
import { PhaseRepo } from '@/core/interfaces/repo/repo-phase.interface';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-repo-phases',
  imports: [CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule,
    SkeletonModule],
  templateUrl: './repo-phases.component.html',
  styleUrl: './repo-phases.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class RepoPhasesComponent {
  	repoPhaseService = inject(RepoPhaseService)

    filterColFields: string[] = ['id', 'name', 'description', 'order'];
	phaseDialog: boolean = false;
	phase!: PhaseRepo;

	phaseSubmitted: boolean = false;

    @ViewChild('dt') dt!: Table;
	@ViewChild('ph') ph!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
		this.phase = {id: 0, name: '', description: '', order: 0};
		this.phaseSubmitted = false;
		this.phaseDialog = true;
    }

	editPhase(phase: PhaseRepo) {
		this.phase = { ...phase };
		this.repoPhaseService.selectedPhase.set(phase);
		this.phaseDialog = true;
	}

    deleteSelectedPhases(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected phases?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.repoPhaseService.selectedPhases.set(this.repoPhaseService.selectedPhases().filter((val) => !this.repoPhaseService.selectedPhases().includes(val)));
                this.repoPhaseService.deletePhase(id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Phases Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.phaseDialog = false;
		this.phaseSubmitted = false;
    }

	findPhaseIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.repoPhaseService.allPhases().length; i++) {
            if (this.repoPhaseService.allPhases()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

	createPhaseId(phase: PhaseRepo) {
		this.repoPhaseService.createPhase(phase);
	}

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'info';
        }
    }

	savePhase() {
		this.phaseSubmitted = true;
		let _phases = this.repoPhaseService.allPhases();
		if (this.phase.name?.trim()) {
			if (this.phase.id) {
                console.log(this.phase);
				_phases[this.findPhaseIndexById(this.phase.id)] = this.phase;
				this.repoPhaseService.selectedPhases.set([..._phases]);
                this.repoPhaseService.editPhase(this.phase.id, this.phase)
				this.messageService.add({
					severity: 'success',
					summary: 'Successful',
					detail: 'Phase Updated',
					life: 3000
				});
            }
            else {
				this.messageService.add({
					severity: 'success',
					summary: 'Successful',
					detail: 'Phase Created',
					life: 3000
				});
				this.repoPhaseService.createPhase(this.phase);
			}

			this.phaseDialog = false;
			this.phase = {
				id: 0,
				name: '',
				description: '',
				order: 0
			};
        }
	}
}

