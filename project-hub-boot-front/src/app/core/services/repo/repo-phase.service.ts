import { computed, effect, inject, Injectable, signal, Signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { PhaseRepo } from '../../interfaces/repo/repo-phase.interface';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepoPhaseService {
  http = inject(HttpClient)
  private apiUrl = environment.apiUrl;

  selectedPhases = signal<PhaseRepo[]>([]);
  selectedPhase = signal<PhaseRepo>({
    id: 0,
    name: '',
    description: '',
    order: 0
  });

  allPhases = computed(() => this.getAllPhasesResource.value() || []);
  allPhasesTemplate = computed(() => {
    const phases = this.getAllPhasesResource.value() as PhaseRepo[];
    return Array.isArray(phases) ? phases : [];
  });
  getAllPhasesResource = rxResource({
    loader: () => {
      return this.http.get<PhaseRepo[]>(this.apiUrl + 'PhaseRepo').pipe(
        catchError(() => of([]))
      );
    }
  })

  editPhase(id: number, phase: PhaseRepo) {
    this.http.put<PhaseRepo>(this.apiUrl + 'PhaseRepo/' + id, phase).subscribe(() => {
      this.getAllPhasesResource.reload();
      console.log(phase, "updated")
    })
  }

  createPhase(phase: PhaseRepo) {
    this.http.post<PhaseRepo>(this.apiUrl + 'PhaseRepo', phase).subscribe(() => {
      this.getAllPhasesResource.reload();
      console.log(phase, "created")
    })
  }

  deletePhase(id: number) {
    this.http.delete<PhaseRepo>(this.apiUrl + 'PhaseRepo/' + id).subscribe(() => {
      this.getAllPhasesResource.reload();
      console.log(id, "deleted")
    })
  }
  
  constructor() { }
  eff = effect(() => {
    console.log(this.allPhases());
    console.log(this.selectedPhase());
  })
}
