using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using project_hub_api.Models.Projects.Notebooks;
using project_hub_api.Models.Projects.Phases;
using project_hub_api.Models.Projects;
using project_hub_api.Models.Repo;
using project_hub_api.Models.Projects.Resources;
using project_hub_api.Models.Projects.Tasks;
using project_hub_api.Models.Users;
using project_hub_api.Models.Notifications;

namespace project_hub_api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { 
            
        }

        // DbSets
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectNotebook> ProjectNotebooks { get; set; }
        public DbSet<ProjectPhase> ProjectPhases { get; set; }
        public DbSet<ProjectTask> ProjectTasks { get; set; }
        public DbSet<ProjectSubTask> ProjectSubTasks { get; set; }   
        public DbSet<ProjectTaskCategory> ProjectTaskCategories { get; set; }
        public DbSet<ProjectTaskComment> ProjectTaskComments { get; set; }
        public DbSet<ProjectTask_Resource> ProjectTaskResources { get; set; }
        public DbSet<ProjectResource> ProjectResources { get; set; }
        public DbSet<ProjectUser> ProjectUsers { get; set; }
        public DbSet<ProjectRole> ProjectRoles { get; set; }
        
        // Repo
        public DbSet<PhaseRepo> PhaseRepo { get; set; }
        public DbSet<TaskRepo> TaskRepo { get; set; }
        public DbSet<TaskTypeRepo> TaskTypeRepo { get; set; }
        public DbSet<ResourceRepo> ResourceRepo { get; set; }
        public DbSet<CategoryRepo> CategoryRepo { get; set; }
        public DbSet<TaskRepo_ResourceRepo> TaskRepoResources { get; set; }
        public DbSet<NotebookRepo> NotebookRepo { get; set; }

        // Hub
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            
            base.OnModelCreating(builder);
            {
                // Project Task Resources - Many to Many
                builder.Entity<ProjectTask_Resource>()
                    .HasKey(p => new { p.ProjectTaskId, p.ProjectResourceId });
                builder.Entity<ProjectTask_Resource>()
                    .HasOne(p => p.ProjectTask)
                    .WithMany(pt => pt.ProjectTaskResources)
                    .HasForeignKey(p => p.ProjectTaskId)
                    .OnDelete(DeleteBehavior.NoAction);
                builder.Entity<ProjectTask_Resource>()
                    .HasOne(p => p.ProjectResource)
                    .WithMany(pr => pr.ProjectTaskResources)
                    .HasForeignKey(p => p.ProjectResourceId)
                    .OnDelete(DeleteBehavior.NoAction);

                // ProjectResource and ProjectUser - One to Many
                builder.Entity<ProjectResource>()
                    .HasOne(pr => pr.User)
                    .WithMany(pu => pu.ProjectResources)
                    .HasForeignKey(pr => pr.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                // TaskRepo and ResourceRepo - Many to Many
                builder.Entity<TaskRepo_ResourceRepo>()
                    .HasKey(p => new { p.TaskRepoId, p.ResourceRepoId });
                builder.Entity<TaskRepo_ResourceRepo>()
                    .HasOne(p => p.TaskRepo)
                    .WithMany(tr => tr.TaskRepoResources)
                    .HasForeignKey(p => p.TaskRepoId)
                    .OnDelete(DeleteBehavior.Cascade);
                builder.Entity<TaskRepo_ResourceRepo>()
                    .HasOne(p => p.ResourceRepo)
                    .WithMany(rr => rr.TaskRepoResources)
                    .HasForeignKey(p => p.ResourceRepoId)
                    .OnDelete(DeleteBehavior.Cascade);
            }
        }
    }
}
