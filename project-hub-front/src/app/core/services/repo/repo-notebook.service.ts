import { NotebookRepo, NotebookRepoCreate } from '@/core/interfaces/repo/repo-notebook.interface';
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RepoNotebookService {

  http = inject(HttpClient)
  private apiUrl = environment.apiUrl;

  selectedNotebooks = signal<NotebookRepo[]>([]);
  selectedNotebook = signal<NotebookRepo>({
    id: 0,
    name: '',
    description: '',
    content: ''
  });

  allNotebooks = computed(() => this.getAllNotebooksResource.value() || []);
  getAllNotebooksResource = rxResource({
    loader: () => {
      return this.http.get<NotebookRepo[]>(this.apiUrl + 'NotebookRepo').pipe(
        catchError(() => of([]))
      );
    }
  })

  editNotebook(id: number, notebook: NotebookRepo) {
    this.http.put<NotebookRepo>(this.apiUrl + 'NotebookRepo/' + id, notebook).subscribe(() => {
      this.getAllNotebooksResource.reload();
      console.log(notebook, "updated")
    })
  }

  createNotebook(notebook: NotebookRepoCreate) {
    this.http.post<NotebookRepoCreate>(this.apiUrl + 'NotebookRepo', notebook).subscribe(() => {
      this.getAllNotebooksResource.reload();
      console.log(notebook, "created")
    })
  }

  deleteNotebook(id: number) {
    this.http.delete<NotebookRepo>(this.apiUrl + 'NotebookRepo/' + id).subscribe(() => {
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
