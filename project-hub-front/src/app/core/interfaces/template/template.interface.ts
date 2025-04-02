import { NotebookTemplate } from "./template-notebook.interface";
import { PhaseTemplate } from "./template-phase.interface";

export interface Template {
    id: number;
    name: string;
    description: string;
    phaseTemplates: PhaseTemplate[];
    notebookTemplates: NotebookTemplate[];
}