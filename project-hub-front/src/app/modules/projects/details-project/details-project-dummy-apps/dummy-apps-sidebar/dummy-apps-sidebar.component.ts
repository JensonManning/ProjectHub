import { DummyComment, DummyKanbanCardType, DummyListName, DummyTask } from '@/core/interfaces/dummy/app-kanban.interface';
import { Subscription } from 'rxjs';
import { DetailsProjectDummyAppsComponent } from '../details-project-dummy-apps.component';
import { AppKanbanService } from '@/core/services/dummy/app-kanban.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { PopoverModule } from 'primeng/popover';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { InplaceModule } from 'primeng/inplace';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProgressBarModule } from 'primeng/progressbar';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DatePickerModule } from 'primeng/datepicker';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-dummy-apps-sidebar',
  imports: [CommonModule, FormsModule, DrawerModule, PopoverModule, TooltipModule, CheckboxModule, InplaceModule, AutoCompleteModule, ProgressBarModule, AvatarModule, InputTextModule, TextareaModule, ButtonModule, RippleModule, DatePickerModule, OverlayPanelModule, StyleClassModule],
  templateUrl: './dummy-apps-sidebar.component.html',
  styleUrl: './dummy-apps-sidebar.component.scss',
  styles: `
        :host ::ng-deep {
            .p-drawer {
                .p-drawer-content {
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                    overflow: auto;
                }
            }
            .p-autocomplete {
                .p-autocomplete-chip-item {
                    display: flex;
                }
            }

            div.p-inplace-display {
                padding-left: 0 !important;
            }
        }
  `
})
export class DummyAppsSidebarComponent {
    card: DummyKanbanCardType = { id: '', taskList: { title: 'Untitled Task List', tasks: [] } };

    formValue!: DummyKanbanCardType;

    listId: string = '';

    newComment: DummyComment = { id: '123', name: 'Jane Cooper', text: '' };

    newTask: DummyTask = { text: '', completed: false };

    comment: string = '';

    taskContent: string = '';

    timeout: any = null;

    showTaskContainer: boolean = false;

    listNames: DummyListName[] = [];

    cardSubscription: Subscription;

    listSubscription: Subscription;

    listNameSubscription: Subscription;

    @ViewChild('inputTitle') inputTitle!: ElementRef;

    @ViewChild('inputTaskListTitle') inputTaskListTitle!: ElementRef;

    constructor(
        public parent: DetailsProjectDummyAppsComponent,
        private kanbanService: AppKanbanService
    ) {

        this.cardSubscription = this.kanbanService.selectedCard$.subscribe((data) => {
            this.card = data;
            this.formValue = { ...data };
        });
        this.listSubscription = this.kanbanService.selectedListId$.subscribe((data) => (this.listId = data));
        this.listNameSubscription = this.kanbanService.listNames$.subscribe((data) => (this.listNames = data));
    }

    ngOnDestroy() {
        this.cardSubscription.unsubscribe();
        this.listSubscription.unsubscribe();
        this.listNameSubscription.unsubscribe();
        clearTimeout(this.timeout);
    }

    close() {
        this.parent.sidebarVisible = false;
        this.resetForm();
    }

    onComment(event: Event) {
        event.preventDefault();
        if (this.comment.trim().length > 0) {
            this.newComment = { ...this.newComment, text: this.comment };
            this.formValue?.comments?.unshift(this.newComment);
            this.comment = '';
        }
    }

    onSave(event: any) {
        event.preventDefault();
        this.card = { ...this.formValue };
        this.kanbanService.updateCard(this.card, this.listId);
        this.close();
    }

    onMove(listId: string) {
        this.kanbanService.moveCard(this.formValue, listId, this.listId);
    }

    onDelete() {
        this.kanbanService.deleteCard(this.formValue?.id || '', this.listId);
        this.parent.sidebarVisible = false;
        this.resetForm();
    }

    resetForm() {
        this.formValue = { id: '', taskList: { title: 'Untitled Task List', tasks: [] } };
    }

    addTaskList() {
        this.showTaskContainer = !this.showTaskContainer;

        if (!this.showTaskContainer) {
            return;
        } else if (!this.formValue.taskList) {
            let id = this.kanbanService.generateId();
            this.formValue = { ...this.formValue, taskList: { id: id, title: 'Untitled Task List', tasks: [] } };
        }
    }

    addTask(event: Event) {
        event.preventDefault();
        if (this.taskContent.trim().length > 0) {
            this.newTask = { text: this.taskContent, completed: false };
            this.formValue.taskList?.tasks.unshift(this.newTask);
            this.taskContent = '';
        }
    }

    focus(arg: number) {
        if (arg == 1) {
            this.timeout = setTimeout(() => this.inputTitle.nativeElement.focus(), 1);
        }
        if (arg == 2) {
            this.timeout = setTimeout(() => this.inputTaskListTitle.nativeElement.focus(), 1);
        }
    }
}
