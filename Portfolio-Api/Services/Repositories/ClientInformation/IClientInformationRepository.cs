using Portfolio_Api.Models;

namespace Portfolio_Api.Services.Repositories
{
    public interface IClientInformationRepository
    {
        public IEnumerable<ClientInformation> GetClientInformation();
        public Task<ClientInformation> GetClientInformation(int id);
        public Task AddClientInformationAsync(ClientInformation clientInformation);
        public Task EditClientInformationAsync(ClientInformation clientInformation);
        public Task DeleteClientInformationAsync(ClientInformation clientInformation);
    }
}
