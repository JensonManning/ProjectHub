using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Projects.Notebooks;
using project_hub_api.Models.Projects.Phases;
using project_hub_api.Models.Projects.Resources;

namespace project_hub_api.Models.Projects
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Shortcode { get; set; } = string.Empty;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }

        public ProjectStatus Status { get; set; }  
        public ProjectType Type { get; set; }

        public List<ProjectResource>? ProjectResources { get; set; } = new List<ProjectResource>(); // 1 to Many
        public List<ProjectNotebook>? ProjectNotebooks { get; set; } = new List<ProjectNotebook>(); // 1 to Many
        public List<ProjectPhase>? ProjectPhases { get; set; } = new List<ProjectPhase>(); // 1 to Many

        public enum ProjectStatus {
            Unknown,
            Sale_Pending,
            Upcoming,
            Active,
            Completed,
            Cancelled,
            Delayed,
            Postponed,
            Late
        }

        public enum ProjectType {
            Unknown,
            Cloud_Plus,
            Cloud_Only,
            Merger,
            Exit
        }

    }
}