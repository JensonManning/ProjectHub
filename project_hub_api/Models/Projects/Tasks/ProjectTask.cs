using project_hub_api.Models.Projects.Phases;

namespace project_hub_api.Models.Projects.Tasks
{
    public class ProjectTask
    {
        public int Id { get; set;}
        public string Name { get; set;} = string.Empty;
        public string Description { get; set;} = string.Empty;
        public ProjectTaskStatus Status { get; set;}
        public DateOnly StartDate { get; set;}
        public DateOnly EndDate { get; set;}
        public bool HasSubTasks { get; set; }

        public int ProjectPhaseId { get; set;} // 1 to Many
        public ProjectPhase? ProjectPhase { get; set;} // 1 to Many
        public int ProjectTaskCategoryId { get; set; } // 1 to Many
        public ProjectTaskCategory? ProjectTaskCategory { get; set; } // 1 to Many

        public List<ProjectSubTask>? ProjectSubTasks { get; set; } = new List<ProjectSubTask>(); // 1 to Many
        public List<ProjectTaskComment>? ProjectTaskComments { get; set; } = new List<ProjectTaskComment>(); // 1 to Many
        public List<ProjectTask_Resource>? ProjectTaskResources { get; set; } // Many to Many

        public enum ProjectTaskStatus {
            Upcoming,
            Active,
            Completed,
            Cancelled,
            Delayed,
            Postponed,
            Late
        }
    }
}