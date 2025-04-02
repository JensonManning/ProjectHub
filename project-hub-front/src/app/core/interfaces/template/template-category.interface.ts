import { TaskTemplate } from "./template-task.interface";

export interface CategoryTemplate {
    id: number;
    name: string;
    description: string;
    templateId: number;
    taskTemplates: TaskTemplate[];
}