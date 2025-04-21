using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using project_hub_api.Data;
using project_hub_api.Models.Repo;
using project_hub_api.IRepositories.Repos;

namespace project_hub_api.Repositories.Repos
{
    public class NotebookRepoRepository : INotebookRepoRepository
    {
        private readonly AppDbContext _context;

        public NotebookRepoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<NotebookRepo>> GetNotebooksAsync()
        {
            return await _context.NotebookRepo.ToListAsync();
        }

        public async Task<NotebookRepo> GetNotebookByIdAsync(int id)
        {
            return await _context.NotebookRepo.FirstOrDefaultAsync(n => n.Id == id);
        }

        public async Task<NotebookRepo> AddNotebookAsync(NotebookRepo notebookRepo)
        {
            _context.NotebookRepo.Add(notebookRepo);
            await _context.SaveChangesAsync();
            return notebookRepo;
        }

        public async Task<NotebookRepo> UpdateNotebookAsync(int id, NotebookRepo notebookRepo)
        {
            var exist = await _context.NotebookRepo.FirstOrDefaultAsync(n => n.Id == id);
            if (exist == null)
            {
                throw new ArgumentException("NotebookRepo not found");
            }

            exist.Name = notebookRepo.Name;
            exist.Description = notebookRepo.Description;
            exist.Content = notebookRepo.Content;
            _context.NotebookRepo.Update(exist);
            await _context.SaveChangesAsync();
            return exist;
        }

        public async Task<NotebookRepo> DeleteNotebookAsync(NotebookRepo notebookRepo)
        {
            _context.NotebookRepo.Remove(notebookRepo);
            await _context.SaveChangesAsync();
            return notebookRepo;
        }
    }
}