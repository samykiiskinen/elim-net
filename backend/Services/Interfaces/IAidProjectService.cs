using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services.Interfaces
{
    public interface IAidProjectService
    {
        Task<List<AidProject>> GetAllAidProjectsAsync();
        Task<AidProject> GetAidProjectByIdAsync(int id);
        Task AddAidProjectAsync(AidProject aidProject);
    }
}
