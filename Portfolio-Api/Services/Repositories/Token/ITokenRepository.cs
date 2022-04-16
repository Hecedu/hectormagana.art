namespace Portfolio_Api.Services.Repositories
{
    public interface ITokenRepository
    {
        public Task AddValidTokenAsync(string token);
        public Task RemoveValidTokenAsync(string token);
        public Task<bool> IsTokenValid(string token);

    }
}
