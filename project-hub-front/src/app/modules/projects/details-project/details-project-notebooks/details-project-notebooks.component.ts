import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '@/core/services/project/project.service';
import { ProjectNotebookService } from '@/core/services/project/project-notebook.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ProjectNotebook } from '@/core/interfaces/project/project-notebook.interface';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-details-project-notebooks',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DialogModule,
    EditorModule,
    FormsModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule
  ],
  templateUrl: './details-project-notebooks.component.html',
  styleUrl: './details-project-notebooks.component.scss'
})
export class DetailsProjectNotebooksComponent {
  projectService = inject(ProjectService);
  notebookService = inject(ProjectNotebookService);

  filterText = signal('');
  notebooks = computed(() => this.projectService.projectDetails()?.projectNotebooks || []);
  filteredNotebooks = computed(() => {
    const searchText = this.filterText().toLowerCase();
    return this.notebooks().filter(notebook => 
      notebook.name.toLowerCase().includes(searchText)
    );
  });
  selectedNotebook = signal<ProjectNotebook | null>(null);
  dialogVisible = signal(false);
  isEditing = signal(false);

  showNotebook(notebook: ProjectNotebook) {
    this.selectedNotebook.set(notebook);
    this.dialogVisible.set(true);
    this.isEditing.set(false);
  }

  editNotebook() {
    this.isEditing.set(true);
  }

  saveNotebook() {
    if (this.selectedNotebook()) {
      this.notebookService.editNotebook(this.selectedNotebook()!.id, {
        id: this.selectedNotebook()!.id,
        name: this.selectedNotebook()!.name,
        description: this.selectedNotebook()!.description,
        content: this.selectedNotebook()!.content,
        projectId: this.selectedNotebook()!.projectId
      });
      this.isEditing.set(false);
    }
  }

  cancelEdit() {
    this.isEditing.set(false);
  }
}
