using Microsoft.AspNetCore.Mvc;
using Portfolio_Api.Models;
using Portfolio_Api.Services;
using System.Diagnostics;

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
        public async Task<IActionResult> AddClientInformation([FromBody] ClientInformationRequest unvalidatedClientInformation)
        {
            var validatedClientInformation = new ClientInformation()
                .setClientName(unvalidatedClientInformation.client_name)
                .setIpAddress(unvalidatedClientInformation.ip_address)
                .setDateAdded(unvalidatedClientInformation.date_added)
                .setAllowedIpRange(unvalidatedClientInformation.allowed_ip_range)
                .setClientPublicKey(unvalidatedClientInformation.client_public_key)
                .setClientPrivateKey(unvalidatedClientInformation.client_private_key);

            await _repository.AddClientInformationAsync(validatedClientInformation);
            return Ok();
        }
        [HttpGet]
        [Route("GetClientInformation")]
        public IEnumerable<ClientInformation> GetClientInformation()
        {
            return _repository.GetClientInformation();
        }

        [HttpGet]
        [Route("WireguardSystemStatus")]
        public string WireguardSystemStatus ()
        {
            string result = ExecuteCommand("systemctl status wg-quick@wg0.service");
            return result;
        }

        [HttpGet]
        [Route("RestartWireguardService")]
        public string RestartWireguardService()
        {
            string result = ExecuteCommand("systemctl restart wg-quick@wg0.service");
            return result;
        }

        [HttpGet]
        [Route("GetClientInformationById")]
        public async Task<ClientInformation> GetClientInformation(int id)
        {
            return await _repository.GetClientInformation(id);
        }

        string ExecuteCommand(string command)
        {
            var process = new Process()
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "bash",
                    Arguments = "-c \" " + command + " \"",
                    RedirectStandardInput = true,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false
                }
            };
            process.Start();
            var result = "";
            result += process.StandardOutput.ReadToEnd();
            result += process.StandardError.ReadToEnd();
            process.WaitForExit();

            return result;
        }
    }
}
