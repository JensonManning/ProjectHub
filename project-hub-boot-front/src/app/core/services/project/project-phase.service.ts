import { ProjectPhaseCreate } from '../../interfaces/project/project-phase.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProjectPhaseService {

  http = inject(HttpClient)
  private apiUrl = environment.apiUrl;

  createPhaseForm(phase: ProjectPhaseCreate) {
    return this.http.post<ProjectPhaseCreate>(`${this.apiUrl}ProjectPhase`, phase);
  }
}
