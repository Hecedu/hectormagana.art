using Microsoft.EntityFrameworkCore;
using Portfolio_Api.Models;

namespace Portfolio_Api.Services.Repositories
{
    public class ClientInformationRepository : IClientInformationRepository
    {
        private readonly IConfiguration configuration;
        private readonly PortfolioDbContext _context;

        public ClientInformationRepository(IConfiguration configuration, PortfolioDbContext context)
        {
            this.configuration = configuration;
            _context = context;
        }
        public async Task AddClientInformationAsync(ClientInformation clientInformation)
        {
            _context.clientinformation.Add(clientInformation);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteClientInformationAsync(ClientInformation clientInformation)
        {
            _context.clientinformation.Remove(clientInformation);
            await _context.SaveChangesAsync();
        }
        public async Task EditClientInformationAsync(ClientInformation clientInformation)
        {
            _context.clientinformation.Update(clientInformation);
            await _context.SaveChangesAsync();
        }
        public IEnumerable<ClientInformation> GetClientInformation()
        {
            return _context.clientinformation.ToList();
        }

        public async Task<ClientInformation> GetClientInformation(int id)
        {
            return await _context.clientinformation.FirstAsync(clientInformation => clientInformation.id == id);
        }

    }
}
