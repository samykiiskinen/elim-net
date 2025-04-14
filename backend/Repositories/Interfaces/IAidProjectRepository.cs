using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Repositories.Interfaces
{
    public interface IAidProjectRepository
    {
        Task<List<AidProject>> GetAllAidProjectsAsync();
        Task<AidProject> GetAidProjectByIdAsync(int id);
        Task AddAidProjectAsync(AidProject aidProject);
    }
}
