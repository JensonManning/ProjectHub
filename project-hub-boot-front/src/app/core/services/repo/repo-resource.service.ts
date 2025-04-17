import { ResourceRepo, ResourceRepoNoTasks } from '../../interfaces/repo/repo-resource.interface';
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RepoResourceService {

  http = inject(HttpClient)
  private apiUrl = environment.apiUrl;

  selectedResources = signal<ResourceRepoNoTasks[]>([]);
  selectedResource = signal<ResourceRepoNoTasks>({
    id: 0,
    name: '',
  });

  allResources = computed(() => this.getAllResourcesResource.value() || []);
  getAllResourcesResource = rxResource({
    loader: () => {
      return this.http.get<ResourceRepoNoTasks[]>(this.apiUrl + 'ResourceRepo').pipe(
        catchError(() => of([]))
      );
    }
  })

  editResource(id: number, Resource: ResourceRepoNoTasks) {
    this.http.put<ResourceRepoNoTasks>(this.apiUrl + 'ResourceRepo/' + id, Resource).subscribe(() => {
      this.getAllResourcesResource.reload();
      console.log(Resource, "updated")
    })
  }

  createResource(Resource: ResourceRepoNoTasks) {
    this.http.post<ResourceRepoNoTasks>(this.apiUrl + 'ResourceRepo', Resource).subscribe(() => {
      this.getAllResourcesResource.reload();
      console.log(Resource, "created")
    })
  }

  deleteResource(id: number) {
    this.http.delete<ResourceRepoNoTasks>(this.apiUrl + 'ResourceRepo/' + id).subscribe(() => {
      this.getAllResourcesResource.reload();
      console.log(id, "deleted")
    })
  }
  
  constructor() { }
  eff = effect(() => {
    console.log(this.allResources());
    console.log(this.selectedResource());
  })
}
