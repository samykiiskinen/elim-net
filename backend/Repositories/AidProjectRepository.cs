using backend.Data;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class AidProjectRepository : IAidProjectRepository
    {
        private readonly AppDbContext _context;

        public AidProjectRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<AidProject>> GetAllAidProjectsAsync()
        {
            return await _context.AidProjects
                .Include(ap => ap.AidProjectAttachments)
                .ThenInclude(aa => aa.Attachment)
                .ToListAsync();
        }

        public async Task<AidProject> GetAidProjectByIdAsync(int id)
        {
            var aidProject = await _context.AidProjects
                .Include(ap => ap.AidProjectAttachments)
                .ThenInclude(aa => aa.Attachment)
                .FirstOrDefaultAsync(ap => ap.Id == id);

            if (aidProject == null)
            {
                throw new KeyNotFoundException($"AidProject with ID {id} not found");
            }

            return aidProject;

        }

        public async Task AddAidProjectAsync(AidProject aidProject)
        {
            _context.AidProjects.Add(aidProject);
            await _context.SaveChangesAsync();
        }
    }
}
