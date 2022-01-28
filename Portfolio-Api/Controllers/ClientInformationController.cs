using Microsoft.AspNetCore.Mvc;
using Portfolio_Api.Models;
using Portfolio_Api.Services;

namespace Portfolio_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientInformationController : ControllerBase
    {
        private IRepository _repository;
        public ClientInformationController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        [Route("AddClientInformation")]
        public async Task<IActionResult> AddClientInformation ([FromBody] ClientInformation clientInformation)
        {
            await _repository.AddClientInformationAsync(clientInformation);
            return Ok();
        }
        [HttpGet]
        [Route("GetClientInformation")]
        public IEnumerable<ClientInformation> GetClientInformation()
        {
            return _repository.GetClientInformation();
        }

        [HttpGet]
        [Route("GetClientInformationById")]
        public async Task<ClientInformation> GetClientInformation(int id)
        {
            return await _repository.GetClientInformation(id);
        }
    }
}
