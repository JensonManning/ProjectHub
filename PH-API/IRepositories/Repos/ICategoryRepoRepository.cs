using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Models.Repo;

namespace PH_API.IRepositories.Repos
{
    public interface ICategoryRepoRepository
    {
        public Task<List<CategoryRepo>> GetCategoryReposAsync();
        public Task<CategoryRepo> GetCategoryRepoAsync(int id);
        public Task<CategoryRepo>AddCategoryRepoAsync(CategoryRepo categoryRepo);
        public Task<CategoryRepo> UpdateCategoryRepoAsync(int id, CategoryRepo categoryRepo);
        public Task<CategoryRepo> DeleteCategoryRepoAsync(int id);
    }
}