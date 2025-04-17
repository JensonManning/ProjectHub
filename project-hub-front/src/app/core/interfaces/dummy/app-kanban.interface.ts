export interface DummyKanbanCardType {
    id: string;
    title?: string;
    comments?: DummyComment[];
    taskList: DummyTaskList;
    icon?: string;
}

export interface DummyKanbanListType {
    listId: string;
    title?: string;
    cards: DummyKanbanCardType[];
}

export interface DummyComment {
    id?: string;
    name: string;
    text: string;
}

export interface DummyListName {
    listId?: string;
    title: string;
}

export interface DummyTaskList {
    id?: string;
    title: string;
    tasks: DummyTask[];
}

export interface DummyTask {
    text: string;
    completed: boolean;
}

export interface DummyAssignee {
    name: string;
}
