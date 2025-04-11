import { ProjectNotebook, ProjectNotebookCreate, ProjectNotebookSimple } from '@/core/interfaces/project/project-notebook.interface';
import { ProjectSimple } from '@/core/interfaces/project/project.interface';
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProjectNotebookService {

  http = inject(HttpClient)
  private apiUrl = environment.apiUrl;

  selectedNotebooks = signal<ProjectNotebook[]>([]);
  selectedNotebook = signal<ProjectNotebookSimple>({
    id: 0,
    name: '',
    description: '',
    content: '',
    projectId: 0,
  });

  allNotebooks = computed(() => this.getAllNotebooksResource.value() || []);
  getAllNotebooksResource = rxResource({
    loader: () => {
      return this.http.get<ProjectNotebook[]>(this.apiUrl + 'ProjectNotebook').pipe(
        catchError(() => of([]))
      );
    }
  })

  editNotebook(id: number, notebook: ProjectNotebookSimple) {
    this.http.put<ProjectNotebookSimple>(this.apiUrl + 'ProjectNotebook/' + id, notebook).subscribe(() => {
      this.getAllNotebooksResource.reload();
      console.log(notebook, "updated")
    })
  }

  createNotebook(notebook: ProjectNotebookCreate) {
    this.http.post<ProjectNotebookCreate>(this.apiUrl + 'ProjectNotebook', notebook).subscribe(() => {
      this.getAllNotebooksResource.reload();
      console.log(notebook, "created")
    })
  }

  deleteNotebook(id: number) {
    this.http.delete<ProjectNotebook>(this.apiUrl + 'ProjectNotebook/' + id).subscribe(() => {
      this.getAllNotebooksResource.reload();
      console.log(id, "deleted")
    })
  }
  
  constructor() { }
  eff = effect(() => {
    console.log(this.allNotebooks());
    console.log(this.selectedNotebook());
  })
}
