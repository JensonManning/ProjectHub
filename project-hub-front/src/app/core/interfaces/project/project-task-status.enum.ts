export enum TaskStatus {
    Upcoming = 0,
    Active = 1,
    Completed = 2,
    Cancelled = 3,
    Delayed = 4,
    Postponed = 5,
    Late = 6
}

export const TaskStatusLabels: Record<TaskStatus, string> = {
    [TaskStatus.Upcoming]: 'Upcoming',
    [TaskStatus.Active]: 'Active',
    [TaskStatus.Completed]: 'Completed',
    [TaskStatus.Cancelled]: 'Cancelled',
    [TaskStatus.Delayed]: 'Delayed',
    [TaskStatus.Postponed]: 'Postponed',
    [TaskStatus.Late]: 'Late'
};

export const TaskStatusColors: Record<TaskStatus, string> = {
    [TaskStatus.Upcoming]: 'info',
    [TaskStatus.Active]: 'warn',
    [TaskStatus.Completed]: 'success',
    [TaskStatus.Cancelled]: 'danger',
    [TaskStatus.Delayed]: 'warn',
    [TaskStatus.Postponed]: 'danger',
    [TaskStatus.Late]: 'danger'
}; 