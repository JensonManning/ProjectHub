export interface TaskTemplate {
    id: number;
    name: string;
    description: string;
    phaseTemplateId : number;
    categoryId: number;
    subtaskTemplates: SubTaskTemplate[];
}

export interface SubTaskTemplate {
    id: number;
    name: string;
    description: string;
    taskTemplateId: number;
}