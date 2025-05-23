import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashPhasesComponent } from './widgets/dash-phases/dash-phases.component';
import { DashTasksComponent } from './widgets/dash-tasks/dash-tasks.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashPhasesComponent, DashTasksComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
