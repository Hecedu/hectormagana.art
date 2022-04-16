using Microsoft.EntityFrameworkCore;
using Portfolio_Api.Models;

namespace Portfolio_Api.Services.Repositories
{
    public class TokenRepository : ITokenRepository
    {
        private readonly IConfiguration configuration;
        private readonly PortfolioDbContext _context;

        public TokenRepository(IConfiguration configuration, PortfolioDbContext context)
        {
            this.configuration = configuration;
            _context = context;
        }

        public async Task AddValidTokenAsync(string token)
        {
            var validToken = new ValidToken().setToken(token);
            await _context.validtokens.AddAsync(validToken);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveValidTokenAsync(string token)
        {
            try
            {
                var invalidToken = await _context.validtokens.FirstAsync(validToken => validToken.token == token);
                _context.validtokens.Remove(invalidToken);
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> IsTokenValid(string token)
        {
            try
            {
                var test = _context.validtokens.ToList();
                await _context.validtokens.FirstAsync(validToken => validToken.token == token);
                return true;
            }
            catch (InvalidOperationException)
            {
                return false;
            }
        }
    }
}
