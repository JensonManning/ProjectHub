using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Repo;

namespace project_hub_api.IRepositories.Repos
{
    public interface ITaskRepoRepository
    {
        public Task<List<TaskRepo>> GetTaskReposAsync();
        public Task<TaskRepo> GetTaskRepoAsync(int id);
        public Task<TaskRepo> AddTaskRepoAsync(TaskRepo taskRepo, List<int> resourceIds);
        public Task<TaskRepo> UpdateTaskRepoAsync(int id, TaskRepo taskRepo);
        public Task<TaskRepo> DeleteTaskRepoAsync(int id);
    }
}