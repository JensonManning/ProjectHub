import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InplaceModule} from 'primeng/inplace';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {MenuModule} from 'primeng/menu';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MenuItem} from 'primeng/api';
import { DetailsProjectDummyAppsComponent } from '../details-project-dummy-apps.component';
import { AppKanbanService } from '@/core/services/dummy/app-kanban.service';
import { DummyKanbanCardType, DummyKanbanListType } from '@/core/interfaces/dummy/app-kanban.interface';
import { DummyAppsCardComponent } from '../dummy-apps-card/dummy-apps-card.component';
import {TooltipModule} from 'primeng/tooltip';

@Component({
  selector: 'app-dummy-apps-list',
  imports: [CommonModule, InplaceModule, ButtonModule, RippleModule, MenuModule, DummyAppsCardComponent, FormsModule, InputTextModule, CdkDropList, CdkDrag, TooltipModule],
  templateUrl: './dummy-apps-list.component.html',
  styleUrl: './dummy-apps-list.component.scss',
  host: {
    class: 'card md:w-[25rem] overflow-hidden shadow-md !rounded-border flex-shrink-0'
},
styles: `
    :host ::ng-deep {
        .p-button-label {
            flex: 0;
            white-space: nowrap;
        }

        .scrollable {
            scroll-behavior: smooth;
            max-height: 70vh;
        }
    }

    :host {
        ::-webkit-scrollbar {
            width: 6px;
        }

        ::-webkit-scrollbar-track {
            background: transparent;
        }

        ::-webkit-scrollbar-thumb {
            background-color: var(--p-gray-500);
            border-radius: 20px;
        }
    }

    .cdk-drag-preview {
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow:
            0 5px 5px -3px rgba(0, 0, 0, 0.2),
            0 8px 10px 1px rgba(0, 0, 0, 0.14),
            0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }

    .cdk-drag-placeholder {
        opacity: 0.25;
    }

    .cdk-drag-animating {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
`
})
export class DummyAppsListComponent {
  @Input() list!: DummyKanbanListType;

    @Input() listIds!: string[];

    menuItems: MenuItem[] = [];

    title: string = '';

    timeout: any = null;

    isMobileDevice: boolean = false;

    @ViewChild('inputEl') inputEl!: ElementRef;

    @ViewChild('listEl') listEl!: ElementRef;

    constructor(
        public parent: DetailsProjectDummyAppsComponent,
        private kanbanService: AppKanbanService
    ) {}

    ngOnInit(): void {
        this.isMobileDevice = this.kanbanService.isMobileDevice();

        this.menuItems = [
            {
                label: 'List actions',
                items: [
                    { separator: true },
                    { label: 'Copy list', command: () => this.onCopy(this.list) },
                    {
                        label: 'Remove list',
                        command: () => {
                            if (this.list.listId) {
                                this.onDelete(this.list.listId);
                            }
                        }
                    }
                ]
            }
        ];
    }

    toggleSidebar() {
        this.parent.sidebarVisible = true;
    }

    onDelete(id: string) {
        this.kanbanService.deleteList(id);
    }

    onCopy(list: DummyKanbanListType) {
        this.kanbanService.copyList(list);
    }

    onCardClick(event: Event, card: DummyKanbanCardType) {
        const eventTarget = event.target as HTMLElement;
        if (!(eventTarget.classList.contains('p-button-icon') || eventTarget.classList.contains('p-trigger'))) {
            if (this.list.listId) {
                this.kanbanService.onCardSelect(card, this.list.listId);
            }
            this.parent.sidebarVisible = true;
        }
    }

    insertCard() {
        if (this.list.listId) {
            this.kanbanService.addCard(this.list.listId);
        }
    }

    dropCard(event: CdkDragDrop<DummyKanbanCardType[]>): void {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
    }

    focus() {
        this.timeout = setTimeout(() => this.inputEl.nativeElement.focus(), 1);
    }

    insertHeight(event: any) {
        event.container.element.nativeElement.style.minHeight = '10rem';
    }

    removeHeight(event: any) {
        event.container.element.nativeElement.style.minHeight = '2rem';
    }
}
