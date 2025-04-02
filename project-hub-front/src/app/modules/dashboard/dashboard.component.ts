import { Component } from '@angular/core';
import { DashTasksComponent } from "./widgets/dash-tasks/dash-tasks.component";
import { DashPhasesComponent } from "./widgets/dash-phases/dash-phases.component";

@Component({
  selector: 'app-dashboard',
  imports: [DashTasksComponent, DashPhasesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
