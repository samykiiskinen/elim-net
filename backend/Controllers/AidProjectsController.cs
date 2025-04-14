using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AidProjectsController : ControllerBase
    {
        private readonly IAidProjectService _service;

        public AidProjectsController(IAidProjectService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AidProject>>> GetAidProjects()
        {
            var projects = await _service.GetAllAidProjectsAsync();
            return Ok(projects); // Return a 200 response with the projects
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AidProject>> GetAidProject(int id)
        {
            var aidProject = await _service.GetAidProjectByIdAsync(id);

            if (aidProject == null)
            {
                return NotFound();
            }

            return Ok(aidProject);
        }

        [HttpPost]
        public async Task<ActionResult<AidProject>> PostAidProject(AidProject aidProject)
        {
            await _service.AddAidProjectAsync(aidProject);
            return CreatedAtAction("GetAidProject", new { id = aidProject.Id }, aidProject);
        }
    }
}