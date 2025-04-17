import { ProjectResource } from '../../interfaces/project/project-resource.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProjectResourceService {
  http = inject(HttpClient)
  private apiUrl = environment.apiUrl;
  
  editResource(id: number, Resource: ProjectResource) {
    return this.http.put<ProjectResource>(`${this.apiUrl}projectresource/${id}`, Resource);
  }
}
