import { ProjectNotebookCreate } from '@/core/interfaces/project/project-notebook.interface';
import { ProjectPhase, ProjectPhaseCreate } from '@/core/interfaces/project/project-phase.interface';
import { ProjectResourceCreate } from '@/core/interfaces/project/project-resource.interface';
import { ProjectTaskCreate } from '@/core/interfaces/project/project-task.interface';
import { ProjectCreate, ProjectStatus, ProjectType } from '@/core/interfaces/project/project.interface';
import { ProjectService } from '@/core/services/project/project.service';
import { RepoNotebookService } from '@/core/services/repo/repo-notebook.service';
import { RepoPhaseService } from '@/core/services/repo/repo-phase.service';
import { RepoResourceService } from '@/core/services/repo/repo-resource.service';
import { RepoTaskService } from '@/core/services/repo/repo-task.service';
import { RepoTaskTypeService } from '@/core/services/repo/repo-tasktype.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { NotebookRepo } from '@/core/interfaces/repo/repo-notebook.interface';
import { DividerModule } from 'primeng/divider';
import { ProjectUserCreate, ProjectUserSimple } from '@/core/interfaces/User/user.interface';
import { UserService } from '@/core/services/user/user.service';
import { ResourceRepoNoTasks } from '@/core/interfaces/repo/repo-resource.interface';
import { ProjectUser } from '@/core/interfaces/User/user.interface';
import { TaskTypeRepo } from '@/core/interfaces/repo/repo-tasktype.interface';
import { RepoCategoryService } from '@/core/services/repo/repo-category.service';
import { ProjectTaskCategoryCreate } from '@/core/interfaces/project/project-task-category.interface';
import { CategoryRepo } from '@/core/interfaces/repo/repo-category.interface';
import { CompleteProjectDto } from '@/core/interfaces/project/complete-project.interface';

interface ProjectWithResources extends ProjectCreate {
  projectResources: ProjectResourceCreate[];
  projectPhases: ProjectPhaseCreate[];
}

@Component({
  selector: 'app-create-projects-v3',
  imports: [ButtonModule, CommonModule, InputTextModule, TextareaModule, SelectModule, FormsModule, MultiSelectModule, DividerModule],
  templateUrl: './create-projects-v3.component.html',
  styleUrl: './create-projects-v3.component.scss'
})
export class CreateProjectsV3Component {
	// Inject services
	projectService = inject(ProjectService);
	phaseRepoService = inject(RepoPhaseService);
	taskTypeRepoService = inject(RepoTaskTypeService);
	taskRepoService = inject(RepoTaskService);
	resourceRepoService = inject(RepoResourceService);
	notebookRepoService = inject(RepoNotebookService);
	userService = inject(UserService);
	taskCategoryRepoService = inject(RepoCategoryService);
	
	// UI state
	start: boolean = false;
	startNotebook: boolean = false;
	startPhase: boolean = false;
	startTask: boolean = false;
	startResource: boolean = false;

	

	// Selected Items
	selectedNotebooks: ProjectNotebookCreate[] = [];
	selectedResource: ProjectResourceCreate = {} as ProjectResourceCreate;
	selectedUser: ProjectUserSimple = {} as ProjectUserSimple;
	selectedPhases: ProjectPhaseCreate[] = [];
	selectedTaskTypes: TaskTypeRepo[] = [];

	// Task selection properties
	totalTasksSelected: number = 0;

	// Selected Resource and User IDs
	selectedResourceId: number | null = null;
	selectedUserId: string | null = null;

	// Project data
	project: ProjectWithResources = {
		name: '',
		description: '',
		shortcode: '',
		startDate: new Date(),
		endDate: new Date(),
		status: 0,
		type: 0,
		projectPhases: [],
		projectResources: []
	};
	notebooks: ProjectNotebookCreate[] = [];
	phases: ProjectPhaseCreate[] = [];
	tasks: ProjectTaskCreate[] = [];
	resources: ProjectResourceCreate[] = [];

  	// Submission state
	submitting: boolean = false;
	submitSuccess: boolean = false;
	submitError: boolean = false;
	errorMessage: string = '';

  	// Form validation
	projectFormInvalid: boolean = false;
	projectFormErrorMessage: string = '';

  	// Status and type options
	status: { label: string; value: number }[] = [];
	type: { label: string; value: number }[] = [];

  	constructor() {
		// Initialize status and type dropdowns
		this.status = Object.keys(ProjectStatus)
			.filter(key => !isNaN(Number(key)))
			.map(key => ({
				label: ProjectStatus[Number(key) as keyof typeof ProjectStatus],
				value: Number(key)
			}));
			
		this.type = Object.keys(ProjectType)
			.filter(key => !isNaN(Number(key)))
			.map(key => ({
				label: ProjectType[Number(key) as keyof typeof ProjectType],
				value: Number(key)
		}));
	}

	ngOnInit(): void {
		// Load resources and users
		this.loadResourcesAndUsers();
		
		// Make sure task types are loaded
		this.taskTypeRepoService.getAllTaskTypesResource.reload();
		
		// Add a small delay to ensure types are loaded before displaying the form
		setTimeout(() => {
			const availableTaskTypes = this.taskTypeRepoService.allTaskTypes();
			console.log('Available task types on init:', availableTaskTypes);
			
			if (!availableTaskTypes || availableTaskTypes.length === 0) {
				console.warn('No task types found. Tasks will not be created correctly.');
			}
		}, 500);
	}
	
	// Load all resources and users
	loadResourcesAndUsers(): void {
		// Force reload resources from the API
		this.resourceRepoService.getAllResourcesResource.reload();
		
	}

	startProjectForm() {
		this.start = true;
	}

	startNotebookForm() {
		
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
		this.start = false;
		this.startNotebook = true;
		console.log("Step 1: ", this.project);
	}

	startResourceForm() {
		this.startResource = true;
		this.start = false;
		this.startNotebook = false;
		console.log("Step 2: ", this.project);
	}

	addResource() {
		if (!this.selectedResourceId || !this.selectedUserId) return;
		
		const resource = this.resourceRepoService.allResources().find(r => r.id === this.selectedResourceId);
		const user = this.userService.allUsers().find(u => u.id === this.selectedUserId);
		
		if (resource && user) {
			const newResource: ProjectResourceCreate = {
				name: resource.name,
				description: `Assigned to ${user.name}`,
				projectId: 0, // Will be set by backend
				userId: user.id
			};
			
			this.project.projectResources.push(newResource);
			console.log("Resource added: ", this.project.projectResources);
			
			// Reset selections
			this.selectedResourceId = null;
			this.selectedUserId = null;
		}
	}

	removeResource(index: number) {
		this.project.projectResources.splice(index, 1);
	}

	startPhaseForm() {
		this.start = false;
		this.startResource = false;
		this.startNotebook = false;
		this.startPhase = true;
		console.log("Step 3: ", this.project);

	}

	// Update phase date
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

	// Phase selection change handler
	onPhaseSelectionChange(selectedPhases: ProjectPhase[]) {
		if (!selectedPhases || !this.project.startDate) return;
	
		// Clear existing phases
		this.phases = [];
	
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
				status: 0, // Default status
				projectTaskCategories: [],
				projectTasks: []
			});
		});
		
		// Update the complete project with phases
		this.project.projectPhases = this.phases;
		console.log("Step 4: ", this.project);
	}

	startTaskForm() {
		this.start = false;
		this.startResource = false;
		this.startNotebook = false;
		this.startTask = true;
		
		console.log("Step 3: ", this.project);
	}

	addTasks() {
		console.log("current phases: ", this.project.projectPhases);
		// Reset task counters and tasks for each phase
		this.totalTasksSelected = 0;
		this.project.projectPhases.forEach(phase => {
			phase.projectTasks = [];
		});

		// Skip if no task types selected
		if (!this.selectedTaskTypes || this.selectedTaskTypes.length === 0) {
			console.log('No task types selected, skipping task update');
			return;
		}

		// Get all tasks from repo
		const allTasks = this.taskRepoService.allTasks();

		// Get selected type IDs
		const selectedTypeIds = this.selectedTaskTypes.map(type => type.id);

		
	}

	onTaskTypeSelectionChange(selectedTaskTypes: TaskTypeRepo[]) {
		console.log('Task type selection changed:', selectedTaskTypes);
		this.selectedTaskTypes = selectedTaskTypes;
		
		// Double check if task types exist in the database
		const availableTaskTypes = this.taskTypeRepoService.allTaskTypes();
		console.log('Available task types:', availableTaskTypes);
		
		// Check for non-existent task types
		if (selectedTaskTypes && selectedTaskTypes.length > 0) {
			const nonExistentTypes = selectedTaskTypes.filter(type => 
				!availableTaskTypes.some(avail => avail.id === type.id)
			);
			
			if (nonExistentTypes.length > 0) {
				console.error('Selected task types that do not exist:', nonExistentTypes);
			}
		}
		
		this.updateTasksBasedOnTypes();
	}

	// Update tasks based on selected task types
	updateTasksBasedOnTypes() {
		console.log('Updating tasks based on selected types');
		
		// Reset task counters and tasks for each phase
		this.totalTasksSelected = 0;
		this.project.projectPhases.forEach(phase => {
			console.log(`Initializing tasks for phase ${phase.order}`);
			phase.projectTasks = [];
		});
		
		// Skip if no task types selected
		if (!this.selectedTaskTypes || this.selectedTaskTypes.length === 0) {
			console.log('No task types selected, skipping task update');
			return;
		}
		
		// Get all tasks from repo
		const allTasks = this.taskRepoService.allTasks();
		console.log('All repo tasks:', allTasks);
		
		// Get selected type IDs
		const selectedTypeIds = this.selectedTaskTypes.map(type => type.id);
		console.log('Selected type IDs:', selectedTypeIds);
		
		// Create a map of phase orders for quick lookup
		const phaseOrderMap = new Map<number, ProjectPhaseCreate>();
		this.project.projectPhases.forEach(phase => {
			console.log(`Adding phase ${phase.order} to map`);
			phaseOrderMap.set(phase.order, phase);
		});
		
		// Filter tasks by selected types and assign to phases
		allTasks.forEach(task => {
			if (selectedTypeIds.includes(task.taskTypeRepoId)) {
				console.log('Found matching task:', task);
				
				// Find the corresponding task type and category
				const taskType = this.selectedTaskTypes.find(type => type.id === task.taskTypeRepoId);
				const category = this.taskCategoryRepoService.allCategories().find(cat => cat.id === task.categoryRepoId);
				
				if (taskType && category) {
					const phase = phaseOrderMap.get(task.phaseOrder);
					if (phase) {
						console.log(`Adding task to phase ${phase.order}:`, task.name);
						const startDate = this.calculatePhaseStartDate(phase.order - 1); // Convert to zero-based index
						const endDate = this.calculatePhaseEndDate(startDate);
						const newTask: ProjectTaskCreate = {
							name: task.name,
							description: task.description,
							status: 1, // Default status
							startDate: startDate,
							endDate: endDate,
							hasSubTasks: task.hasSubTaskRepo,
							projectPhaseId: 0, // Will be set by backend
							projectTaskCategoryId: category.id,
							projectSubTask: null,
							resourceIds: task.taskRepoResources?.map(tr => tr.resourceRepo.id) || [] // Extract resource IDs
						};
						phase.projectTasks.push(newTask);
						this.totalTasksSelected++;
						console.log(`Task added to phase ${phase.order}. Total tasks in phase: ${phase.projectTasks.length}`);
					} else {
						console.warn('No matching phase found for task:', task);
					}
				} else {
					console.warn('Task type or category not found for task:', task);
				}
			}
		});
		
		console.log('Final task counts by phase:');
		this.project.projectPhases.forEach(phase => {
			console.log(`Phase ${phase.order}: ${phase.projectTasks.length} tasks`);
			console.log('Tasks in phase:', phase.projectTasks);
		});
		
		// Process categories AFTER tasks have been added
		this.processCategoriesForPhases(); 
	}

	// Process categories for phases
	processCategoriesForPhases() {
		// For each phase, get its categories
		this.project.projectPhases.forEach((phase: ProjectPhaseCreate) => {
			// Clear existing categories
			phase.projectTaskCategories = [];
			
			// Get all categories from the repo
			const allCategories = this.taskCategoryRepoService.allCategories();
			
			// Add each category used by tasks in this phase
			phase.projectTasks.forEach(task => {
				const categoryRepo = allCategories.find(c => c.id === task.projectTaskCategoryId);
				if (categoryRepo) {
					const categoryCreate: ProjectTaskCategoryCreate = {
						id: categoryRepo.id,
						name: categoryRepo.name,
						description: categoryRepo.description,
						projectId: 0 // Will be set when project is created
					};
					phase.projectTaskCategories.push(categoryCreate);
				}
			});
			
			console.log(`Phase ${phase.order} has ${phase.projectTaskCategories.length} categories`);
		});
	}

	createProject() {
		// Format dates for API
		const formattedProject: CompleteProjectDto = {
			name: this.project.name,
			description: this.project.description,
			shortcode: this.project.shortcode,
			startDate: this.formatDateForApi(this.project.startDate),
			endDate: this.formatDateForApi(this.project.endDate),
			status: this.project.status,
			type: this.project.type,
			notebooks: this.project.projectNotebooks || [],
			resources: this.project.projectResources || [],
			phases: this.project.projectPhases.map(phase => ({
				name: phase.name,
				description: phase.description,
				order: phase.order,
				startDate: this.formatDateForApi(phase.startDate),
				endDate: this.formatDateForApi(phase.endDate),
				status: phase.status,
				taskCategories: phase.projectTaskCategories || [],
				tasks: (phase.projectTasks || []).map(task => ({
					name: task.name,
					description: task.description,
					startDate: this.formatDateForApi(task.startDate),
					endDate: this.formatDateForApi(task.endDate),
					projectTaskCategoryId: task.projectTaskCategoryId,
					hasSubTasks: task.hasSubTasks,
					status: task.status,
					subTasks: task.projectSubTask || [],
					resourceIds: task.resourceIds || []
				}))
			}))
		};

		console.log("Project to be created: ", formattedProject);
		this.projectService.createCompleteProject(formattedProject).subscribe({
			next: response => {
				console.log("Project created successfully: ", response);
				this.submitSuccess = true;
				this.submitError = false;
				this.resetForm();
			},
			error: error => {
				console.error("Error creating project: ", error);
				this.submitError = true;
				this.submitSuccess = false;
				this.errorMessage = error.message || 'An error occurred while creating the project.';
			}
		});
	}

	

	resetForm() {
		this.start = false;
		this.startNotebook = false;
		this.startPhase = false;
		this.startTask = false;
		this.startResource = false;
		this.project = {
			name: '',
			description: '',
			shortcode: '',
			startDate: new Date(),
			endDate: new Date(),
			status: 0,
			type: 0,
			projectPhases: [],
			projectResources: []
		} as ProjectWithResources;
		this.notebooks = [];
		this.phases = [];
		this.tasks = [];
		this.resources = [];
	}

	// Date formatting utilities
	formatDate(date: Date | string): string {
		if (!date) return '';
		const d = new Date(date);
		return d.toLocaleDateString('en-US', { 
			weekday: 'long',
			year: 'numeric', 
			month: 'short', 
			day: 'numeric' 
		});
	}

	formatDateForInput(date: Date | string): string {
		if (!date) return '';
		const d = new Date(date);
		return d.toISOString().split('T')[0];
	}

	formatDateForApi(date: Date | string): string {
		if (!date) return '';
		const d = new Date(date);
		return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
	}

  	// Date change handlers
	updateProjectStartDate(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.valueAsDate) {
			this.project.startDate = new Date(target.valueAsDate);
			// this.onProjectStartDateChange();
		}
	}
	
	updateProjectEndDate(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.valueAsDate) {
			this.project.endDate = new Date(target.valueAsDate);
		}
	}

	// onProjectStartDateChange() {
	// 	// If we have already selected phases, recalculate their dates when project start date changes
	// 	if (this.selectedPhases && this.selectedPhases.length > 0) {
	// 		this.onPhaseSelectionChange(this.selectedPhases);
	// 	}
	// }

	// Notebook selection handler
	onNotebookSelectionChange(selectedNotebooks: NotebookRepo[]) {
		// Clear existing notebooks
		this.project.projectNotebooks = [];
		
		// Convert repo notebooks to project notebooks
		selectedNotebooks.forEach(notebook => {
			const notebookCreate = {
				name: notebook.name,
				description: notebook.description,
				content: notebook.content,
				projectId: 0 // Will be set later by the backend
			};
			
			this.project.projectNotebooks?.push(notebookCreate);
		});
		
		console.log(`Selected ${this.project.projectNotebooks?.length} notebooks`);
	}

	// Helper methods for phase date calculation
	private calculatePhaseStartDate(phaseIndex: number): Date {
		// Create a timezone-safe date
		const projectStartDate = new Date(this.project.startDate);
		const year = projectStartDate.getFullYear();
		const month = projectStartDate.getMonth();
		const day = projectStartDate.getDate();
		
		if (phaseIndex === 0) {
			// Phase 1 starts on the project start date
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


  
}
