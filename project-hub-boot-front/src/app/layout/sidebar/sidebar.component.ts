import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ClipboardList, Tags, Users, ListCheck, NotebookPen, ListOrdered, SquareChartGantt, Zap, CheckCircle2, User, Plus, Home, Building2 } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[app-sidebar]',
  standalone: true,
  imports: [RouterModule, LucideAngularModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  // Icons
  Home = Home;
  CheckCircle2 = CheckCircle2;
  Zap = Zap;
  SquareChartGantt = SquareChartGantt;
  User = User;
  Plus = Plus;
  ListOrdered = ListOrdered;
  NotebookPen = NotebookPen;
  ListCheck = ListCheck;
  Users = Users;
  Tags = Tags;
  ClipboardList = ClipboardList;

  // Menu structure
  dashboardMenu = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' }
  ];

  manageMenu = [
    { name: 'Manage', 
      icon: Building2, 
      path: '#',
      expanded: false,
      submenu: [
        { name: 'Projects', icon: Zap, path: '/manage/projects' },
        { name: 'Users', icon: User, path: '/manage/users' },
        { name: 'Tasks', icon: CheckCircle2, path: '/manage/tasks' }
      ]
    },
    { name: 'Create Project', icon: Plus, path: '/project/create' }
  ];

  repoMenu = [
    { name: 'Phases', icon: ListOrdered, path: '/repo/phases' },
    { name: 'Notebooks', icon: NotebookPen, path: '/repo/notebooks' },
    { name: 'Resources', icon: Users, path: '/repo/resources' },
    { name: 'Tasks', icon: ListCheck, path: '/repo/tasks' },
    { name: 'Task Categories', icon: Tags, path: '/repo/task-categories' },
    { name: 'Task Types', icon: ClipboardList, path: '/repo/task-types' },

    
  ]
  toggleSubmenu(item: any) {
    item.expanded = !item.expanded;
  }
}
