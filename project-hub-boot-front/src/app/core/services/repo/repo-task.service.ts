import { TaskRepo, TaskRepoCreate, TaskRepoUpdate } from '../../interfaces/repo/repo-task.interface';
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RepoTaskService {

  http = inject(HttpClient)
  private apiUrl = environment.apiUrl;

  selectedTasks = signal<TaskRepo[]>([]);
  selectedTask = signal<TaskRepo>({
    id: 0,
    name: '',
    description: '',
    phaseOrder: 0,
    hasSubTaskRepo: false,
    categoryRepoId: 0,
    taskRepoResources: [],
    taskTypeRepoId: 0,
    taskTypeRepo: {
      id: 0,
      name: '',
    },
    subTaskRepo: [],
    categoryRepo: {
      id: 0,
      name: '',
    }
  });

  allTasks = computed(() => this.getAllTasksResource.value() || []);
  allTasksTemplate = computed(() => {
    const tasks = this.getAllTasksResource.value() as TaskRepo[];
    return Array.isArray(tasks) ? tasks : [];
  });
  getAllTasksResource = rxResource({
    loader: () => {
      return this.http.get<TaskRepo[]>(this.apiUrl + 'TaskRepo').pipe(
        catchError(() => of([]))
      );
    }
  })

  // editTask(id: number, task: TaskRepoUpdate) {
  //   const updateData = {
  //       ...task,
  //       resourceIds: task.resourceIds || []
  //   };
    
  //   return this.http.put<TaskRepoUpdate>(`${this.apiUrl}TaskRepo/${id}`, updateData)
  //       .pipe(
  //           catchError(error => {
  //               console.error('Error updating task:', error);
  //               return throwError(() => new Error('Failed to update task'));
  //           })
  //       );
  // }

  editTask(id: number, task: TaskRepoUpdate) {
    const updateData = {
        ...task,
        resourceIds: task.resourceIds || []
    };
    
    return this.http.put<TaskRepoUpdate>(`${this.apiUrl}TaskRepo/${id}`, updateData)
        .pipe(
            catchError(error => {
                console.error('Error updating task:', error);
                const errorMessage = error.error?.message || 'Failed to update task';
                return throwError(() => new Error(errorMessage));
            })
        );
}

  createTask(taskRepo: TaskRepoCreate) {
    return this.http.post<TaskRepo>(this.apiUrl + 'TaskRepo', taskRepo)
        .pipe(
            catchError(error => {
                console.error('Error creating task:', error);
                return throwError(() => new Error(`Failed to create task: ${error.message || 'Server error'}`));
            })
        );
  }

  createSubTask(subTaskRepo: any) {
    return this.http.post<any>(this.apiUrl + 'SubTaskRepo', subTaskRepo)
        .pipe(
            catchError(error => {
                console.error('Error creating subtask:', error);
                return throwError(() => new Error(`Failed to create subtask: ${error.message || 'Server error'}`));
            })
        );
  }

  deleteTask(id: number) {
    this.http.delete<TaskRepo>(this.apiUrl + 'TaskRepo/' + id).subscribe(() => {
      this.getAllTasksResource.reload();
      console.log(id, "deleted")
    })
  }
  
  constructor() { }
  eff = effect(() => {
    console.log(this.allTasks());
    console.log(this.selectedTask());
  })
}
