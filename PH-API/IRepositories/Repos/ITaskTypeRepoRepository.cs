using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Models.Repo;

namespace PH_API.IRepositories.Repos
{
    public interface ITaskTypeRepoRepository
    {
        public Task<List<TaskTypeRepo>> GetTaskTypeReposAsync();
        public Task<TaskTypeRepo> GetTaskTypeRepoAsync(int id);
        public Task<TaskTypeRepo> CreateTaskTypeRepoAsync(TaskTypeRepo taskTypeRepo);
        public Task<TaskTypeRepo> UpdateTaskTypeRepoAsync(int id, TaskTypeRepo taskTypeRepo);
        public Task<TaskTypeRepo> DeleteTaskTypeRepoAsync(int id);
    }
}