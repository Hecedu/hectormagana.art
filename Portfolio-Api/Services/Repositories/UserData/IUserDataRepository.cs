using Portfolio_Api.Models;
using Portfolio_Api.Models.RequestModels;

namespace Portfolio_Api.Services.Repositories
{
    public interface IUserDataRepository
    {
        public Task AddUserData(UserData userData);
        public Task<UserData> GetOrAddUserDataByJwt(string jwt);
        public Task<UserData> GetUserDataByUserName(string username);
        public Task<UserData> GetUserDataByEmail(string email);
        public Task EditUserDataAsync(UserDataRequest editRequest);
        public Task EditUserDataProfilePictureByJwt(string profilePictureKey, string jwt);
        public Task DeleteUserDataAsync(UserData userData);
    }
}
