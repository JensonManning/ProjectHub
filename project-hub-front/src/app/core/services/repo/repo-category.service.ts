import { CategoryRepo } from '@/core/interfaces/repo/repo-category.interface';
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RepoCategoryService {
  http = inject(HttpClient)
  private apiUrl = environment.apiUrl;

  selectedCategories = signal<CategoryRepo[]>([]);
  selectedCategory = signal<CategoryRepo>({
    id: 0,
    name: '',
    description: ''
  });

  allCategories = computed(() => this.getAllCategoriesResource.value() || []);
  getAllCategoriesResource = rxResource({
    loader: () => {
      return this.http.get<CategoryRepo[]>(this.apiUrl + 'CategoryRepo').pipe(
        catchError(() => of([]))
      );
    }
  })

  editCategory(id: number, category: CategoryRepo) {
    this.http.put<CategoryRepo>(this.apiUrl + 'CategoryRepo/' + id, category).subscribe(() => {
      this.getAllCategoriesResource.reload();
      console.log(category, "updated")
    })
  }

  createCategory(category: CategoryRepo) {
    this.http.post<CategoryRepo>(this.apiUrl + 'CategoryRepo', category).subscribe(() => {
      this.getAllCategoriesResource.reload();
      console.log(category, "created")
    })
  }

  deleteCategory(id: number) {
    this.http.delete<CategoryRepo>(this.apiUrl + 'CategoryRepo/' + id).subscribe(() => {
      this.getAllCategoriesResource.reload();
      console.log(id, "deleted")
    })
  }
  
  constructor() { }
  eff = effect(() => {
    console.log(this.allCategories());
    console.log(this.selectedCategory());
  })
}
