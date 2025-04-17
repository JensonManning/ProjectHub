import { Component, inject } from '@angular/core';
import { AppKanbanService } from '@/core/services/dummy/app-kanban.service';
import { DummyAppsSidebarComponent } from './dummy-apps-sidebar/dummy-apps-sidebar.component';
import { DummyAppsListComponent } from './dummy-apps-list/dummy-apps-list.component';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { DummyAppsCardComponent } from './dummy-apps-card/dummy-apps-card.component';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';
import { DummyKanbanListType } from '@/core/interfaces/dummy/app-kanban.interface';
@Component({
  selector: 'app-details-project-dummy-apps',
  imports: [DummyAppsSidebarComponent, DummyAppsListComponent, DummyAppsCardComponent, DragDropModule, CommonModule],
  templateUrl: './details-project-dummy-apps.component.html',
  styleUrl: './details-project-dummy-apps.component.scss',
  styles: `
        :host {
            ::-webkit-scrollbar {
                height: 6px;
            }

            ::-webkit-scrollbar-track {
                background: transparent;
            }

            ::-webkit-scrollbar-thumb {
                background-color: var(--gray-500);
                border-radius: 20px;
            }
        }

        :host ::ng-deep {
            .p-button-label {
                flex: 0;
                white-space: nowrap;
            }

            .p-inplace {
                .p-inplace-content {
                    .p-inputtext {
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                    }

                    .p-button {
                        border-top-left-radius: 0px;
                        border-bottom-left-radius: 0px;
                        width: 3rem;
                        height: 3rem;
                    }
                }

                .p-inplace-display {
                    padding: 0;
                }
            }
        }

        .p-kanban-list {
            cursor: pointer;
            height: min-content;
            width: 19.3%;
            align-items: center;
            overflow-y: scroll;
            scroll-behavior: smooth;
            overflow-x: hidden;
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
    `,
    providers: [AppKanbanService]
})
export class DetailsProjectDummyAppsComponent {
  sidebarVisible: boolean = false;

    lists: DummyKanbanListType[] = [];

    listIds: string[] = [];

    subscription = new Subscription();

    style!: HTMLStyleElement;

    isMobileDevice: boolean = false;

    constructor(private kanbanService: AppKanbanService) {
        this.subscription = this.kanbanService.lists$.subscribe((data) => {
            this.lists = data;
            this.listIds = this.lists.map((l) => l.listId || '');
        });
    }

    ngOnInit() {
        this.removeLayoutResponsive();
        this.isMobileDevice = this.kanbanService.isMobileDevice();
    }

    toggleSidebar() {
        this.sidebarVisible = true;
    }

    addList() {
        this.kanbanService.addList();
    }

    dropList(event: CdkDragDrop<DummyKanbanListType[]>) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

    removeLayoutResponsive() {
        this.style = document.createElement('style');
        this.style.innerHTML = `
                .layout-content {
                    width: 100%;
                }

                .layout-topbar {
                    width: 100%;
                }
            `;
        document.head.appendChild(this.style);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        document.head.removeChild(this.style);
    }
  
  
}
