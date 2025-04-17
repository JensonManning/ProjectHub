import { ProjectRole, ProjectRoleSimple } from '../../interfaces/User/role.interface';
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  selectedRole = signal<ProjectRoleSimple | null>(null);
  selectedRoles = signal<ProjectRoleSimple[]>([]);

  allRoles = computed(() => this.getAllRolesResource?.value() || [] as ProjectRoleSimple[])
  getAllRolesResource = rxResource({
    loader: () => this.http.get<ProjectRoleSimple[]>(this.apiUrl + 'projectrole').pipe(
      catchError(() => of([]))
    )
  })

  createRole(role: ProjectRoleSimple) {
    this.http.post(this.apiUrl + 'projectrole', role).subscribe(() => {
      this.getAllRolesResource.reload();
      console.log(role, "created")
    });
  }

  editRole(id: number, role: ProjectRoleSimple) {
    this.http.put(this.apiUrl + 'projectrole/' + id, role).subscribe(() => {
      this.getAllRolesResource.reload();
      console.log(role, "updated")
    });
  }

  deleteRole(id: number) {
    this.http.delete(this.apiUrl + 'projectrole/' + id).subscribe(() => {
      this.getAllRolesResource.reload();
      console.log(id, "deleted")
    });
  }
}
