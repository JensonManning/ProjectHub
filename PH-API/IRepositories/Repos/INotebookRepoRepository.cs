using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Models.Repo;

namespace PH_API.IRepositories.Repos
{
    public interface INotebookRepoRepository
    {
        public Task<List<NotebookRepo>> GetNotebooksAsync();
        public Task<NotebookRepo> GetNotebookByIdAsync(int id);
        public Task<NotebookRepo> AddNotebookAsync(NotebookRepo notebookRepo);
        public Task<NotebookRepo> UpdateNotebookAsync(int id, NotebookRepo notebookRepo);
        public Task<NotebookRepo> DeleteNotebookAsync(NotebookRepo notebookRepo);
    }
}