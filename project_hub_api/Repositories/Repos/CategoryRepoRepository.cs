using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using project_hub_api.Data;
using project_hub_api.IRepositories.Repos;
using project_hub_api.Models.Repo;

namespace project_hub_api.Repositories.Repos
{
    public class CategoryRepoRepository : ICategoryRepoRepository
    {
        private readonly AppDbContext _context;
        public CategoryRepoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<CategoryRepo>> GetCategoryReposAsync()
        {
            return await _context.CategoryRepo.ToListAsync();
        }

        public async Task<CategoryRepo> GetCategoryRepoAsync(int id)
        {
            var categoryRepo = await _context.CategoryRepo.FirstOrDefaultAsync(x => x.Id == id);
            if (categoryRepo == null)
            {
                throw new Exception("CategoryRepo not found");
            }
            return categoryRepo; 
        }

        public async Task<CategoryRepo> AddCategoryRepoAsync(CategoryRepo categoryRepo)
        {
            await _context.CategoryRepo.AddAsync(categoryRepo);
            await _context.SaveChangesAsync();
            return categoryRepo;
        }

        public async Task<CategoryRepo> UpdateCategoryRepoAsync(int id, CategoryRepo categoryRepo)
        {
            var category = await _context.CategoryRepo.FirstOrDefaultAsync(x => x.Id == id);
            if (category == null)
            {
                throw new Exception("CategoryRepo not found");
            }

            category.Name = categoryRepo.Name;
            category.Description = categoryRepo.Description;

            _context.CategoryRepo.Update(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<CategoryRepo> DeleteCategoryRepoAsync(int id)
        {
            var categoryRepo = await _context.CategoryRepo.FindAsync(id);
            if (categoryRepo == null)
            {
                throw new Exception("CategoryRepo not found");
            }
            _context.CategoryRepo.Remove(categoryRepo);
            await _context.SaveChangesAsync();
            return categoryRepo;
        }
    }
}