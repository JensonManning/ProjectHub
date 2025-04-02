using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PH_API.Data;
using PH_API.Models.Repo;
using PH_API.IRepositories.Repos;

namespace PH_API.Repositories.Repos
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