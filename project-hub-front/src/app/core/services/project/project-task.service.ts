import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ProjectTask, ProjectTaskCreate } from '@/core/interfaces/project/project-task.interface';
import { catchError, Observable, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProjectResource } from '@/core/interfaces/project/project-resource.interface';
import { ProjectTaskResources } from '@/core/interfaces/project/project-task-resources.interface';
import { UserService } from '@/core/services/user/user.service';
import { ProjectService } from './project.service';
@Injectable({
  providedIn: 'root'
})
export class ProjectTaskService {

  http = inject(HttpClient)
  userService = inject(UserService)
  projectService = inject(ProjectService)
  private apiUrl = environment.apiUrl;

  allTasks = computed(() => this.getAllTasksResource.value() || [] as ProjectTask[]);

  allUserTasks = computed(() => {
    const currentUserId = this.userService.currentUser().id;
    console.log("Current User ID: ", currentUserId);
  
    const filteredTasks = this.allTasks().filter(task => {
      console.log("Inspecting Task: ", task);
  
      const match = task.projectTaskResources?.some(taskResource => {
        console.log("Inspecting Task Resource: ", taskResource);
        return taskResource.projectResource?.userId === currentUserId;
      });
  
      console.log("Task Match: ", match);
      return match;
    });
  
    console.log("Filtered Tasks: ", filteredTasks);
    return filteredTasks;
  });



  getAllTasksResource = rxResource({
    loader: () => this.http.get<ProjectTask[]>(`${this.apiUrl}projecttask`).pipe(
      catchError(() => of([]))
    )
  })

  createProjectTask(projectTask: ProjectTaskCreate) {
    return this.http.post<ProjectTaskCreate>(`${this.apiUrl}projecttask`, projectTask);
  }

  completeProjectTask(taskId: number) {
    return this.http.put<ProjectTask>(`${this.apiUrl}projecttask/complete/${taskId}`, {});
  }

  eff = effect(() => {
    console.log("All tasks: ", this.allTasks())
    console.log("All user tasks: ", this.allUserTasks());
  })
}

