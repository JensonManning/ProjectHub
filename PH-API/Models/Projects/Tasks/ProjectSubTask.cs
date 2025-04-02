using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PH_API.Models.Projects.Tasks
{
    public class ProjectSubTask
    {
        public int Id { get; set;}
        public string Name { get; set;} = string.Empty;
        public string Description { get; set;} = string.Empty;
        public SubTaskStatus Status { get; set;}
        public DateOnly StartDate { get; set;}
        public DateOnly EndDate { get; set;}

        public int ProjectTaskId { get; set; } // 1 to Many
        public ProjectTask? ProjectTask { get; set; } // 1 to Many

        public enum SubTaskStatus {
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