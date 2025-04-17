import { TaskTypeRepoCreate, TaskTypeRepoSimple } from '../../interfaces/repo/repo-tasktype.interface';
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RepoTaskTypeService {
  http = inject(HttpClient)
  private apiUrl = environment.apiUrl;

  selectedTaskTypes = signal<TaskTypeRepoSimple[]>([]);
  selectedTaskType = signal<TaskTypeRepoSimple>({
    id: 0,
    name: ''
  });

  allTaskTypes = computed(() => this.getAllTaskTypesResource.value() || []);
  getAllTaskTypesResource = rxResource({
    loader: () => {
      return this.http.get<TaskTypeRepoSimple[]>(this.apiUrl + 'TaskTypeRepo').pipe(
        catchError(() => of([]))
      );
    }
  })

  editTaskType(id: number, notebook: TaskTypeRepoSimple) {
    this.http.put<TaskTypeRepoSimple>(this.apiUrl + 'TaskTypeRepo/' + id, notebook).subscribe(() => {
      this.getAllTaskTypesResource.reload();
      console.log(notebook, "updated")
    })
  }

  createTaskType(notebook: TaskTypeRepoCreate) {
    this.http.post<TaskTypeRepoCreate>(this.apiUrl + 'TaskTypeRepo', notebook).subscribe(() => {
      this.getAllTaskTypesResource.reload();
      console.log(notebook, "created")
    })
  }

  deleteTaskType(id: number) {
    this.http.delete<TaskTypeRepoSimple>(this.apiUrl + 'TaskTypeRepo/' + id).subscribe(() => {
      this.getAllTaskTypesResource.reload();
      console.log(id, "deleted")
    })
  }
  
  constructor() { }
  eff = effect(() => {
    console.log(this.allTaskTypes());
    console.log(this.selectedTaskType());
  })
}
