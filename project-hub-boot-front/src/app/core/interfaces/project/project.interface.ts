import { ProjectNotebook, ProjectNotebookCreate } from "./project-notebook.interface";
import { ProjectPhase, ProjectPhaseCreate } from "./project-phase.interface";
import { ProjectResource, ProjectResourceCreate } from "./project-resource.interface";

export interface Project {
    id: number;
    name: string;
    description: string;
    shortcode: string;
    startDate: Date;
    endDate: Date;
    status: number;
    type: number;
    projectPhases: ProjectPhase[];
    projectResources: ProjectResource[];
    projectNotebooks: ProjectNotebook[];
}

export interface ProjectCreate {
    name: string;
    description: string;
    shortcode: string;
    startDate: Date;
    endDate: Date;
    status: number;
    type: number;
    projectPhases: ProjectPhaseCreate[];
    projectResources?: ProjectResourceCreate[];
    projectNotebooks?: ProjectNotebookCreate[];
}

export interface ProjectV2Create {
    id ?: number | null;
    name: string;
    description: string;
    shortcode: string;
    startDate: Date;
    endDate: Date;
    status: number;
    type: number;
}

export interface ProjectUpdate {
    name: string;
    description: string;
    shortcode: string;
    startDate: Date;
    endDate: Date;
    status: number;
    type: number;
}

export interface ProjectSimple {
    id: number;
    name: string;
    description: string;
    shortcode: string;
    startDate: Date;
    endDate: Date;
    status: number;
    type: number;
}

export const ProjectStatus = {
    0: 'Unknown',
    1: 'Sale Pending', 
    2: 'Upcoming',
    3: 'Active',
    4: 'Completed',
    5: 'Cancelled',
    6: 'Delayed',
    7: 'Postponed',
    8: 'Late'
};

export const ProjectType = {
    0: 'Unknown',
    1: 'Cloud Plus',
    2: 'Cloud Only',
    3: 'Merger',
    4: 'Exit'
};