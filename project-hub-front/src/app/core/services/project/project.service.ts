import { Project } from '@/core/interfaces/project/project.interface';
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  http = inject(HttpClient)
  private apiUrl = environment.apiUrl;

  selectedProjects = signal<Project[]>([]);
  selectedProject = signal<Project>({
    id: 0,
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    status: 0,
    type: 0,
    projectPhases: [],
    projectResources: [],
    projectNotebooks: [],
  });


  allProjects = computed(() => this.getAllProjectsResource.value() || []);
  getAllProjectsResource = rxResource({
    loader: () => {
      return this.http.get<Project[]>(this.apiUrl + 'ProjectRepo').pipe(
        catchError(() => of([]))
      );
    }
  })

  editProject(id: number, Project: Project) {
    this.http.put<Project>(this.apiUrl + 'ProjectRepo/' + id, Project).subscribe(() => {
      this.getAllProjectsResource.reload();
      console.log(Project, "updated")
    })
  }

  createProject(Project: Project) {
    this.http.post<Project>(this.apiUrl + 'ProjectRepo', Project).subscribe(() => {
      this.getAllProjectsResource.reload();
      console.log(Project, "created")
    })
  }

  deleteProject(id: number) {
    this.http.delete<Project>(this.apiUrl + 'ProjectRepo/' + id).subscribe(() => {
      this.getAllProjectsResource.reload();
      console.log(id, "deleted")
    })
  }
  
  constructor() { }
  eff = effect(() => {
    console.log(this.allProjects());
    console.log(this.selectedProject());
  })  
}
