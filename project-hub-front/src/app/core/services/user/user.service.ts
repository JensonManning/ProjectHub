import { ProjectUser, ProjectUserUpdate } from '@/core/interfaces/User/user.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl;

    selectedUser = signal<ProjectUser>({} as ProjectUser);
    selectedUsers = signal<ProjectUser[]>([]);

    currentUser = computed(() => this.getCurrentUserResource?.value() || {} as ProjectUser)
    getCurrentUserResource = rxResource({
      loader: () =>  { 
        return this.http.get<ProjectUser>(this.apiUrl + 'ProjectUser/currentuser').pipe(
          catchError((error) => {
            console.error('Error getting current user:', error);
            return of({} as ProjectUser);
          })
        )
      }
    })

    allUsers = computed(() => this.getAllUsersResource?.value() || [] as ProjectUser[])
    getAllUsersResource = rxResource({
      loader: () => {
        return this.http.get<ProjectUser[]>(this.apiUrl + 'ProjectUser').pipe(
          catchError((error) => {
            console.error('Error getting all users:', error);
            return of([]);
          })
        )
      }
    })

    private handleError(error: HttpErrorResponse) {
      console.error('API Error:', error);
      let errorMessage = 'An unknown error occurred';
      
      if (error.status === 404) {
        errorMessage = 'Resource not found';
      } else if (error.status === 500) {
        errorMessage = 'Internal server error';
      }
      
      return throwError(() => new Error(errorMessage));
    }

    editUser(id: string, projectUser: ProjectUser) {
      // Create an update DTO with the ID included as a workaround for the backend bug
      const updateDto = {
        id: id, // Include the ID to work around the backend bug
        name: projectUser.name,
        email: projectUser.email,
        phone: projectUser.phone,
        roleId: projectUser.roleId || projectUser.role?.id
      };
      
      console.log(`Updating user ID: ${id} with data:`, updateDto);
      
      this.http.put<ProjectUser>(this.apiUrl + 'ProjectUser/' + id, updateDto)
        .pipe(catchError(error => this.handleError(error)))
        .subscribe({
          next: () => {
            this.getAllUsersResource.reload();
            console.log(projectUser, "updated");
          },
          error: (err) => console.error('Failed to update user:', err)
        });
    }
  
    createUser(projectUser: ProjectUser) {
      // Create a create DTO that matches the backend's ProjectUserCreateDto structure
      const createDto = {
        id: projectUser.id,
        name: projectUser.name,
        email: projectUser.email,
        phone: projectUser.phone,
        roleId: projectUser.roleId || projectUser.role?.id
      };
      
      console.log('Creating user with data:', createDto);
      
      this.http.post<ProjectUser>(this.apiUrl + 'ProjectUser', createDto)
        .pipe(catchError(error => this.handleError(error)))
        .subscribe({
          next: () => {
            this.getAllUsersResource.reload();
            console.log(projectUser, "created");
          },
          error: (err) => console.error('Failed to create user:', err)
        });
    }
  
    deleteUser(id: string) {
      this.http.delete<ProjectUser>(this.apiUrl + 'ProjectUser/' + id)
        .pipe(catchError(error => this.handleError(error)))
        .subscribe({
          next: () => {
            this.getAllUsersResource.reload();
            console.log(id, "deleted");
          },
          error: (err) => console.error('Failed to delete user:', err)
        });
    }

    constructor() {
      effect(() => {
        console.log(this.getCurrentUserResource.value());
      })
    } 
}
