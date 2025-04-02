import { TaskTemplate } from "./template-task.interface";

export interface PhaseTemplate {
    id: number;
    name: string;
    description: string;
    phaseOrder: number;
    templateId: number;
    templateTasks: TaskTemplate[];
}