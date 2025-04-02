import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Project, ProjectCreate, ProjectStatus, ProjectType } from 'src/app/core/interfaces/project/project.interface';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { RepoPhaseService } from '@/core/services/repo/repo-phase.service';
import { ProjectPhase, ProjectPhaseCreate } from '@/core/interfaces/project/project-phase.interface';
import { DividerModule } from 'primeng/divider';
import { RepoTaskTypeService } from '@/core/services/repo/repo-tasktype.service';
import { TaskTypeRepo } from '@/core/interfaces/repo/repo-tasktype.interface';
import { RepoTaskService } from '@/core/services/repo/repo-task.service';
import { TaskRepo } from '@/core/interfaces/repo/repo-task.interface';
import { ProjectTask, ProjectTaskCreate } from '@/core/interfaces/project/project-task.interface';
import { AccordionModule } from 'primeng/accordion';
import { ProjectTaskCategoryCreate } from '@/core/interfaces/project/project-task-category.interface';
import { RepoCategoryService } from '@/core/services/repo/repo-category.service';
import { RepoNotebookService } from '@/core/services/repo/repo-notebook.service';
import { ProjectNotebookCreate } from '@/core/interfaces/project/project-notebook.interface';
import { NotebookRepo } from '@/core/interfaces/repo/repo-notebook.interface';

@Component({
  selector: 'app-create-projects',
  imports: [DividerModule, ButtonModule, CommonModule, FormsModule, InputTextModule, TextareaModule, SelectModule, MultiSelectModule, AccordionModule],
  templateUrl: './create-projects.component.html',
  styleUrl: './create-projects.component.scss'
})
export class CreateProjectsComponent {
	phaseRepoService = inject(RepoPhaseService);
	taskTypeRepoService = inject(RepoTaskTypeService);
	taskRepoService = inject(RepoTaskService);
	taskCategoryRepoService = inject(RepoCategoryService);
	taskNotebookRepoService = inject(RepoNotebookService);

	start : boolean = false;
	startPhase : boolean = false;
	startTask : boolean = false;
	startResource : boolean = false;
	startNotebook : boolean = false;
	
	projectFormInvalid: boolean = false;
	projectFormErrorMessage: string = '';

	project : ProjectCreate = {} as ProjectCreate;
	projects : ProjectCreate[] = [] as ProjectCreate[];
	projectCreated : Project = {} as Project;

	phases : ProjectPhaseCreate[] = [] as ProjectPhaseCreate[];
	phase: ProjectPhase = {} as ProjectPhase;
	phasesSelected : ProjectPhase[] = [] as ProjectPhase[];
	
	selectedTaskTypes: TaskTypeRepo[] = [];
	tasksToAdd: {[phaseOrder: number]: (ProjectTaskCreate & { autoAssigned?: boolean })[]} = {};
	totalTasksSelected: number = 0;

	selectedTaskCategories: ProjectTaskCategoryCreate[] = [];
	selectedNotebooks: ProjectNotebookCreate[] = [];

	status : { label: string; value: number }[] = [];
	type : { label: string; value: number }[] = [];

	constructor() {
		this.status = Object.keys(ProjectStatus).map(key => ({
			label: ProjectStatus[Number(key) as keyof typeof ProjectStatus], // Display text
			value: Number(key) // Actual value
		}));
		this.type = Object.keys(ProjectType).map(key => ({
			label: ProjectType[Number(key) as keyof typeof ProjectType], // Display text
			value: Number(key) // Actual value
		}));
	}

	startProjectForm() {
		this.start = !this.start;
	}

	startPhaseForm() {
		// Validate required project fields
		if (!this.project.name || !this.project.description || 
			!this.project.startDate || !this.project.endDate || 
			this.project.status === undefined || this.project.type === undefined) {
			
			this.projectFormInvalid = true;
			this.projectFormErrorMessage = 'Please fill in all required project information.';
			return;
		}

		this.projectFormInvalid = false;
		this.projectFormErrorMessage = '';

		// Toggle the phase form visibility
		this.startPhase = !this.startPhase;
		
		// Clear previous phases data
		this.phases = [] as ProjectPhaseCreate[];
		this.phasesSelected = [] as ProjectPhase[];
		this.phase = {} as ProjectPhase;
		
		// Initialize project.projectPhases if not already set
		if (!this.project.projectPhases) {
			this.project.projectPhases = [];
		}
	}

	startTaskForm() {
		// Save phases to project before proceeding
		this.savePhaseData();
		
		// Initialize task structure for each phase
		this.tasksToAdd = {};
		this.phases.forEach(phase => {
			this.tasksToAdd[phase.order] = [];
		});
		
		this.startTask = !this.startTask;
	}

	savePhaseData() {
		// Ensure we have phases to save
		if (!this.phases || this.phases.length === 0) {
			return;
		}

		// Format dates for API before saving
		const formattedPhases = this.phases.map(phase => ({
			...phase,
			startDate: this.formatDateForApi(phase.startDate) as any,
			endDate: this.formatDateForApi(phase.endDate) as any
		}));

		// Update project.projectPhases with the formatted phases
		this.project.projectPhases = formattedPhases;
		
		// Format project dates for API
		this.project.startDate = this.formatDateForApi(this.project.startDate) as any;
		this.project.endDate = this.formatDateForApi(this.project.endDate) as any;
		
		console.log('Project with formatted dates:', this.project);
	}

	startResourceForm() {
		// Save task data before proceeding
		this.saveTaskData();
		
		this.startResource = !this.startResource;
	}

	startNotebookForm() {
		// Save task data before proceeding
		this.saveTaskData();
		
		this.startNotebook = !this.startNotebook;
	}

	resetForm() {
		this.start = false;
		this.startPhase = false;
		this.startTask = false;
		this.startResource = false;
		this.startNotebook = false;
		this.project = {} as ProjectCreate;
		this.phases = [] as ProjectPhaseCreate[];
		this.phasesSelected = [] as ProjectPhase[];
		this.phase = {} as ProjectPhase;
	}

	formatDate(date: Date): string {
		if (!date) return '';
		const d = new Date(date);
		return d.toLocaleDateString('en-US', { 
			weekday: 'long',
			year: 'numeric', 
			month: 'short', 
			day: 'numeric' 
		});
	}

	formatDateForInput(date: Date): string {
		if (!date) return '';
		const d = new Date(date);
		// Get date in YYYY-MM-DD format for input fields
		return d.toISOString().split('T')[0];
	}

	formatDateForApi(date: Date): string {
		if (!date) return '';
		// Format as YYYY-MM-DD for API
		const d = new Date(date);
		return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
	}

	updatePhaseStartDate(phase: ProjectPhaseCreate, event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.valueAsDate) {
			phase.startDate = new Date(target.valueAsDate);
		}
	}
	
	updatePhaseEndDate(phase: ProjectPhaseCreate, event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.valueAsDate) {
			phase.endDate = new Date(target.valueAsDate);
		}
	}

	updateProjectStartDate(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.valueAsDate) {
			this.project.startDate = new Date(target.valueAsDate);
			this.onProjectStartDateChange();
		}
	}
	
	updateProjectEndDate(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.valueAsDate) {
			this.project.endDate = new Date(target.valueAsDate);
		}
	}

	onProjectStartDateChange() {
		// If we have already selected phases, recalculate their dates when project start date changes
		if (this.phasesSelected && this.phasesSelected.length > 0) {
			this.onPhaseSelectionChange(this.phasesSelected);
		}
	}

	onPhaseSelectionChange(selectedPhases: ProjectPhase[]) {
		if (!selectedPhases || !this.project.startDate) return;
	
		// Clear existing phases
		this.phases = [] as ProjectPhaseCreate[];
	
		// Add new phases with calculated dates
		selectedPhases.forEach((phase: ProjectPhase, index: number) => {
			const startDate = this.calculatePhaseStartDate(index);
			const endDate = this.calculatePhaseEndDate(startDate);
			
			this.phases.push({
				name: phase.name,
				description: phase.description,
				order: phase.order,
				startDate: startDate,
				endDate: endDate,
				projectTasks: [], // Initialize empty task array for each phase
				projectTaskCategories: [] // Initialize empty categories array for each phase
			});
		});
	}

	private calculatePhaseStartDate(phaseIndex: number): Date {
		// Create a timezone-safe date by using year, month, day components
		const projectStartDate = new Date(this.project.startDate);
		const year = projectStartDate.getFullYear();
		const month = projectStartDate.getMonth();
		const day = projectStartDate.getDate();
		
		if (phaseIndex === 0) {
			// Phase 1 starts on the project start date (create new date to avoid timezone issues)
			return new Date(year, month, day);
		} else {
			// Get the end date of the previous phase
			const previousPhaseEndDate = new Date(this.phases[phaseIndex - 1].endDate);
			
			// Find the next Monday after the previous phase's end date
			const nextMonday = new Date(previousPhaseEndDate);
			nextMonday.setDate(previousPhaseEndDate.getDate() + 
				((1 + 7 - previousPhaseEndDate.getDay()) % 7 || 7)); // Find next Monday
			
			return nextMonday;
		}
	}
	
	private calculatePhaseEndDate(startDate: Date): Date {
		const endDate = new Date(startDate);
		
		// If start date is Monday, add 4 days to get to Friday
		// If start date is not Monday, find the next Friday
		if (startDate.getDay() === 1) { // Monday is 1
			endDate.setDate(startDate.getDate() + 4); // Add 4 days to get Friday
		} else {
			// Calculate days until Friday (5 = Friday)
			const daysUntilFriday = (5 - startDate.getDay() + 7) % 7;
			endDate.setDate(startDate.getDate() + daysUntilFriday);
		}
		
		return endDate;
	}

	onTaskTypeSelectionChange(selectedTaskTypes: TaskTypeRepo[]) {
		this.selectedTaskTypes = selectedTaskTypes;
		this.updateTasksBasedOnTypes();
	}
	
	updateTasksBasedOnTypes() {
		// Reset task counters
		this.totalTasksSelected = 0;
		
		// Clear existing tasks
		Object.keys(this.tasksToAdd).forEach(phaseOrder => {
			this.tasksToAdd[Number(phaseOrder)] = [];
		});
		
		// Skip if no task types selected
		if (!this.selectedTaskTypes || this.selectedTaskTypes.length === 0) {
			return;
		}
		
		// Get all tasks from repo
		const allTasks = this.taskRepoService.allTasks();
		
		// Filter tasks by selected types and assign to phases
		const selectedTypeIds = this.selectedTaskTypes.map(type => type.id);
		
		// Create a map of phase orders for quick lookup
		const phaseOrderMap = new Map<number, ProjectPhaseCreate>();
		this.phases.forEach(phase => {
			phaseOrderMap.set(phase.order, phase);
		});
		
		// Get the first phase as a fallback for tasks without a matching phase
		const firstPhase = this.phases.length > 0 ? this.phases[0] : null;
		const unassignedTasks: {name: string, typeId: number}[] = [];
		
		// Track categories for each phase
		const categoryByPhase: Map<number, Set<number>> = new Map();
		this.phases.forEach(phase => {
			categoryByPhase.set(phase.order, new Set<number>());
		});
		
		allTasks.forEach(task => {
			// If task matches selected types
			if (selectedTypeIds.includes(task.taskTypeRepoId)) {
				// Find the phase that matches the task's phaseOrder
				let phase = phaseOrderMap.get(task.phaseOrder);
				
				// If no matching phase, use the first phase as fallback (if available)
				if (!phase && firstPhase) {
					phase = firstPhase;
					unassignedTasks.push({
						name: task.name, 
						typeId: task.taskTypeRepoId
					});
				}
				
				// If we have a phase to add to, add the task
				if (phase) {
					const taskCreate: ProjectTaskCreate & { autoAssigned?: boolean } = {
						name: task.name,
						description: task.description,
						startDate: new Date(phase.startDate),
						endDate: new Date(phase.endDate),
						status: 0, // Default status
						hasSubTasks: task.hasSubTaskRepo,
						projectPhaseId: 0, // Will be set when saving
						projectTaskTypeId: task.taskTypeRepoId,
						autoAssigned: !phaseOrderMap.has(task.phaseOrder)
					};
					
					this.tasksToAdd[phase.order].push(taskCreate);
					this.totalTasksSelected++;
					
					// Track category for this phase if it exists
					if (task.categoryRepoId) {
						categoryByPhase.get(phase.order)?.add(task.categoryRepoId);
					}
				}
			}
		});
		
		// Process categories and add them to phases
		this.processCategoriesForPhases(categoryByPhase);
		
		// Log warning about unassigned tasks
		if (unassignedTasks.length > 0) {
			console.warn(`${unassignedTasks.length} tasks were automatically assigned to the first phase because they had no matching phase order:`, 
				unassignedTasks.map(t => t.name).join(', '));
		}
	}
	
	processCategoriesForPhases(categoryByPhase: Map<number, Set<number>>) {
		// For each phase, get its categories
		categoryByPhase.forEach((categoryIds, phaseOrder) => {
			// Find the phase object
			const phase = this.phases.find(p => p.order === phaseOrder);
			if (!phase) return;
			
			// Clear existing categories
			phase.projectTaskCategories = [];
			
			// Get categories from the repo
			const allCategories = this.taskCategoryRepoService.allCategories();
			
			// Add each category used by tasks in this phase
			categoryIds.forEach(categoryId => {
				const categoryRepo = allCategories.find(c => c.id === categoryId);
				if (categoryRepo) {
					const categoryCreate: ProjectTaskCategoryCreate = {
						name: categoryRepo.name,
						description: categoryRepo.description,
						projectId: 0 // Will be set later
					};
					
					phase.projectTaskCategories.push(categoryCreate);
				}
			});
			
			console.log(`Phase ${phaseOrder} has ${phase.projectTaskCategories.length} categories`);
		});
	}
	
	saveTaskData() {
		// Update each phase with its tasks
		this.phases.forEach(phase => {
			const phaseTasks = this.tasksToAdd[phase.order] || [];
			
			// Convert tasks back to standard ProjectTaskCreate without the autoAssigned property
			// Also format dates for API
			const standardTasks: ProjectTaskCreate[] = phaseTasks.map(task => {
				// Extract only the standard properties and format dates
				const { name, description, status, hasSubTasks, projectPhaseId, projectTaskTypeId } = task;
				return { 
					name, 
					description, 
					status, 
					hasSubTasks, 
					projectPhaseId, 
					projectTaskTypeId,
					startDate: this.formatDateForApi(task.startDate) as any,
					endDate: this.formatDateForApi(task.endDate) as any
				};
			});
			
			phase.projectTasks = [...standardTasks];
		});
		
		// Format phase dates again to ensure consistency
		this.phases.forEach(phase => {
			phase.startDate = this.formatDateForApi(phase.startDate) as any;
			phase.endDate = this.formatDateForApi(phase.endDate) as any;
		});
		
		// Update project phases with the updated phases including tasks
		this.project.projectPhases = [...this.phases];
		
		// Format project dates for API
		this.project.startDate = this.formatDateForApi(this.project.startDate) as any;
		this.project.endDate = this.formatDateForApi(this.project.endDate) as any;
		
		console.log('Project with phases and tasks (formatted dates):', this.project);
	}

	onNotebookSelectionChange(selectedNotebooks: NotebookRepo[]) {
		// Initialize project notebooks array if it doesn't exist
		if (!this.project.projectNotebooks) {
			this.project.projectNotebooks = [];
		}
		
		// Clear existing notebooks
		this.selectedNotebooks = [];
		
		// Convert repo notebooks to project notebooks
		selectedNotebooks.forEach(notebook => {
			const notebookCreate: ProjectNotebookCreate = {
				name: notebook.name,
				description: notebook.description,
				content: notebook.content,
				projectId: 0 // Will be set when saving to the API
			};
			
			this.selectedNotebooks.push(notebookCreate);
		});
		
		console.log(`Selected ${this.selectedNotebooks.length} notebooks`);
	}
	
	saveNotebookData() {
		// Update project with selected notebooks
		this.project.projectNotebooks = [...this.selectedNotebooks];
		
		console.log('Project with notebooks:', this.project);
	}
	
	submitProject() {
		// Save notebooks before submitting
		this.saveNotebookData();
		
		// Final preparation for API submission
		// Format dates for API
		this.project.startDate = this.formatDateForApi(this.project.startDate) as any;
		this.project.endDate = this.formatDateForApi(this.project.endDate) as any;
		
		// Format phase dates
		if (this.project.projectPhases) {
			this.project.projectPhases.forEach(phase => {
				phase.startDate = this.formatDateForApi(phase.startDate) as any;
				phase.endDate = this.formatDateForApi(phase.endDate) as any;
				
				// Format task dates
				if (phase.projectTasks) {
					phase.projectTasks.forEach(task => {
						task.startDate = this.formatDateForApi(task.startDate) as any;
						task.endDate = this.formatDateForApi(task.endDate) as any;
					});
				}
			});
		}
		
		// Here you would call your API service to submit the project
		console.log('Submitting final project:', this.project);
		
		// Reset form after submission
		this.resetForm();
	}
}
