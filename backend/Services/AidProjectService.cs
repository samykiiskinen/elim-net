using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services
{
    public class AidProjectService : IAidProjectService
    {
        private readonly IAidProjectRepository _repository;

        public AidProjectService(IAidProjectRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<AidProject>> GetAllAidProjectsAsync()
        {
            return await _repository.GetAllAidProjectsAsync();
        }

        public async Task<AidProject> GetAidProjectByIdAsync(int id)
        {
            return await _repository.GetAidProjectByIdAsync(id);
        }

        public async Task AddAidProjectAsync(AidProject aidProject)
        {
            await _repository.AddAidProjectAsync(aidProject);
        }
    }
}
