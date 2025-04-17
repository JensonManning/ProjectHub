import { Component, Input, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppKanbanService } from '@/core/services/dummy/app-kanban.service';
import { DummyKanbanCardType } from '@/core/interfaces/dummy/app-kanban.interface';
import { CommonModule } from '@angular/common';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { ProgressBarModule } from 'primeng/progressbar';
import { CdkDragHandle } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dummy-apps-card',
  imports: [CommonModule, TieredMenuModule, ButtonModule, RippleModule, AvatarModule, ProgressBarModule, AvatarGroupModule, CdkDragHandle],
  templateUrl: './dummy-apps-card.component.html',
  styleUrl: './dummy-apps-card.component.scss'
})
export class DummyAppsCardComponent implements OnDestroy {

  @Input() card!: DummyKanbanCardType;

    @Input() listId!: string;

    menuItems: MenuItem[] = [];

    subscription: Subscription;

    constructor(private kanbanService: AppKanbanService) {
        this.subscription = this.kanbanService.lists$.subscribe((data) => {
            let subMenu = data.map((d) => ({ id: d.listId, label: d.title, command: () => this.onMove(d.listId) }));
            this.generateMenu(subMenu);
        });
    }

    parseDate(dueDate: string) {
        return new Date(dueDate).toDateString().split(' ').slice(1, 3).join(' ');
    }

    onDelete() {
        this.kanbanService.deleteCard(this.card.id, this.listId);
    }

    onCopy() {
        this.kanbanService.copyCard(this.card, this.listId);
    }

    onMove(listId: string) {
        this.kanbanService.moveCard(this.card, listId, this.listId);
    }

    generateMenu(subMenu: any[]) {
        this.menuItems = [
            { label: 'Copy card', command: () => this.onCopy() },
            { label: 'Move card', items: subMenu },
            { label: 'Delete card', command: () => this.onDelete() }
        ];
    }

    generateTaskInfo() {
        let total = this.card.taskList.tasks.length;
        let completed = this.card.taskList.tasks.filter((t) => t.completed).length;
        return `${completed} / ${total}`;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
