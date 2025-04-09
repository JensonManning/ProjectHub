import { Project, ProjectCreate, ProjectV2Create } from '@/core/interfaces/project/project.interface';
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserService } from '../user/user.service';
import { CompleteProjectDto } from '../../interfaces/project/complete-project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  http = inject(HttpClient)
  userService = inject(UserService);
  private apiUrl = environment.apiUrl;

  selectedProjects = signal<Project[]>([]);
  selectedProject = signal<Project>({
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
    projectNotebooks: [],
  });
  selectedProjectId = signal<number>(0);
  

  allProjects = computed(() => this.getAllProjectsResource.value() || []);
  allProjectsByUser = computed(() => this.allProjects().filter((project) => project.projectResources.some((resource) => resource.userId === this.userService.currentUser().id)));
  allActiveProjectsByUser = computed(() => this.allProjectsByUser().filter((project) => project.status === 3));
  getAllProjectsResource = rxResource({
    loader: () => {
      return this.http.get<Project[]>(this.apiUrl + 'Project').pipe(
        catchError(() => of([]))
      );
    }
  })

  projectDetails = computed(() => this.getProjectResource.value() || {} as Project);
  getProjectResource = rxResource({
    request: this.selectedProjectId,
    loader: () => {
      return this.http.get<Project>(this.apiUrl + 'Project/' + this.selectedProjectId()).pipe(
        catchError(() => of({} as Project))
      );
    }
  })

  getProject(id: number) {
    return this.http.get<Project>(this.apiUrl + 'Project/' + id)
  }

  editProject(id: number, Project: Project) {
    return this.http.put<Project>(this.apiUrl + 'Project/' + id, Project)
  }

  createProject(Project: ProjectCreate) {
    return this.http.post<ProjectV2Create>(this.apiUrl + 'Project', Project)

  }

  deleteProject(id: number) {
    this.http.delete<Project>(this.apiUrl + 'Project/' + id).subscribe(() => {
      this.getAllProjectsResource.reload();
      console.log(id, "deleted")
    })
  }
  createProjectForm(Project: ProjectV2Create) {
    return this.http.post<ProjectV2Create>(this.apiUrl + 'Project', Project)
  }
  editProjectForm(id: number, Project: ProjectV2Create) {
    return this.http.put<ProjectV2Create>(this.apiUrl + 'Project/' + id, Project)
  }
  
  createCompleteProject(completeProject: CompleteProjectDto) {
    return this.http.post<Project>(this.apiUrl + 'Project/complete', completeProject);
  }
  
  constructor() { }
  eff = effect(() => {
    console.log(this.allProjects());
    console.log(this.selectedProject());
    console.log("allActiveProjectsByUser", this.allActiveProjectsByUser());
    console.log("allProjectsByUser", this.allProjectsByUser());
    console.log("project details : ", this.projectDetails());
  })  
}
