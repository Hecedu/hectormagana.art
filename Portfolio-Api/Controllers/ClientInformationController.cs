using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio_Api.Models;
using Portfolio_Api.Services;
using Portfolio_Api.Services.Repositories;
using System.Diagnostics;

namespace Portfolio_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientInformationController : ControllerBase
    {
        private IClientInformationRepository clientInformationRepository;
        public ClientInformationController(IClientInformationRepository clientInformationRepository)
        {
            this.clientInformationRepository = clientInformationRepository;
        }



        [HttpPost]
        [Route("AddClientInformation"), Authorize(Roles = "User")]
        public async Task<IActionResult> AddClientInformation([FromBody] ClientInformationRequest unvalidatedClientInformation)
        {
            var validatedClientInformation = new ClientInformation()
                .setClientName(unvalidatedClientInformation.client_name ?? throw new ArgumentNullException())
                .setIpAddress(unvalidatedClientInformation.ip_address ?? throw new ArgumentNullException())
                .setAllowedIpRange(unvalidatedClientInformation.allowed_ip_range ?? throw new ArgumentNullException());


            await clientInformationRepository.AddClientInformationAsync(validatedClientInformation);
            return Ok();
        }
        [HttpPut]
        [Route("ApproveClientInformation"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateClientInformation([FromBody] ClientInformationRequest unvalidatedClientInformation)
        {
            throw new NotImplementedException();
        }
        [HttpGet]
        [Route("GetClientInformation"), Authorize(Roles = "Admin")]
        public IEnumerable<ClientInformation> GetClientInformation()
        {
            return clientInformationRepository.GetClientInformation();
        }

        [HttpGet]
        [Route("WireguardSystemStatus"), Authorize(Roles = "Admin")]
        public string WireguardSystemStatus()
        {
            string result = ExecuteCommand("systemctl status wg-quick@wg0.service");
            return result;
        }

        [HttpGet]
        [Route("RestartWireguardService"), Authorize(Roles = "Admin")]
        public string RestartWireguardService()
        {
            string result = ExecuteCommand("systemctl restart wg-quick@wg0.service");
            return result;
        }

        [HttpGet]
        [Route("GetClientInformationById"), Authorize(Roles = "Admin")]
        public async Task<ClientInformation> GetClientInformation(int id)
        {
            return await clientInformationRepository.GetClientInformation(id);
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
