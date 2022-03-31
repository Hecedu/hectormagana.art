using Portfolio_Api.Models;

namespace Portfolio_Api.Services
{
    public interface IAuthService
    {
        Task<string> CreateValidTokenAsync (string email);
        Task RemoveValidTokenAsync(string token);
    }
}
