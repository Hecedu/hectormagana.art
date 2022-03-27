using Portfolio_Api.Models;

namespace Portfolio_Api.Services
{
    public interface IAuthService
    {
        string CreateToken(string email);
    }
}
