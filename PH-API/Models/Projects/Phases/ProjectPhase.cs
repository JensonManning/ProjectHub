using System;
using System.Collections.Generic;
using System.Linq;
using PH_API.Models.Projects.Tasks;

namespace PH_API.Models.Projects.Phases
{
    public class ProjectPhase
    {
        public int Id { get; set;}
        public string Name { get; set;} = string.Empty;     
        public string Description { get; set;} = string.Empty;       
        public DateOnly StartDate { get; set;}
        public DateOnly EndDate { get; set;}
        public int Order { get; set;}

        public List<ProjectTask> ProjectTasks { get; set;} = new List<ProjectTask>(); // 1 to Many
        public List<ProjectTaskCategory> ProjectTaskCategories { get; set;} = new List<ProjectTaskCategory>(); // 1 to Many
        public int ProjectId { get; set; } // 1 to Many
        public Project? Project { get; set; } // 1 to Many

        public PhaseStatus Status { get; set;}

        public enum PhaseStatus {
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