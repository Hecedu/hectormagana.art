using Google.Apis.Auth;
using Microsoft.EntityFrameworkCore;
using Portfolio_Api.Models;
using Portfolio_Api.Models.RequestModels;

namespace Portfolio_Api.Services.Repositories
{
    public class UserDataRepository : IUserDataRepository
    {
        private readonly IConfiguration configuration;
        private readonly PortfolioDbContext _context;
        public UserDataRepository(IConfiguration configuration, PortfolioDbContext context)
        {
            this.configuration = configuration;
            _context = context;
        }
        public async Task AddUserData(UserData userData)
        {
            _context.userdata.Add(userData);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteUserDataAsync(UserData userData)
        {
            _context.userdata.Remove(userData);
            await _context.SaveChangesAsync();
        }
        public async Task EditUserDataAsync(UserDataRequest editRequest)
        {
            var userDataToEdit = await _context.userdata.FirstAsync(UserData => UserData.email == editRequest.email);
            if (userDataToEdit != null)
            {
                userDataToEdit.setFavoriteVideogame(editRequest.favorite_videogame ?? throw new ArgumentNullException())
                            .setFavoriteMovie(editRequest.favorite_movie ?? throw new ArgumentNullException())
                            .setFavoriteBook(editRequest.favorite_book ?? throw new ArgumentNullException())
                            .setFavoriteAlbum(editRequest.favorite_album ?? throw new ArgumentNullException());
                await _context.SaveChangesAsync();
            }
        }
        public async Task<UserData> GetUserDataByUserName(string username)
        {
            return await _context.userdata.FirstAsync(userdata => userdata.username == username);
        }

        public async Task<UserData> GetUserDataByEmail(string email)
        {
            return await _context.userdata.FirstAsync(UserData => UserData.email == email);
        }

        public async Task<UserData> GetOrAddUserDataByJwt(string jwt)
        {
            GoogleJsonWebSignature.ValidationSettings settings = new GoogleJsonWebSignature.ValidationSettings();
            settings.Audience = new List<string>() { configuration.GetSection("AppSettings:GoogleId").Value };
            GoogleJsonWebSignature.Payload payload = GoogleJsonWebSignature.ValidateAsync(jwt, settings).Result;
            try
            {
                var result = await _context.userdata.FirstAsync(UserData => UserData.email == payload.Email);
                return result;
            }
            catch (InvalidOperationException)
            {
                var entry = new UserData(payload.Name, payload.Email);
                _context.userdata.Add(entry);
                await _context.SaveChangesAsync();
                return await _context.userdata.FirstAsync(UserData => UserData.email == payload.Email);
            }
            catch (ArgumentNullException)
            {
                throw;
            }
        }
        public async Task EditUserDataProfilePictureByJwt(string profilePictureKey, string jwt)
        {
            GoogleJsonWebSignature.ValidationSettings settings = new GoogleJsonWebSignature.ValidationSettings();
            settings.Audience = new List<string>() { configuration.GetSection("AppSettings:GoogleId").Value };
            GoogleJsonWebSignature.Payload payload = GoogleJsonWebSignature.ValidateAsync(jwt, settings).Result;
            try
            {
                var userDataToEdit = await _context.userdata.FirstAsync(UserData => UserData.email == payload.Email);
                userDataToEdit.setProfilePictureKey(profilePictureKey);
                await _context.SaveChangesAsync();
            }
            catch (ArgumentNullException)
            {
                throw;
            }
        }
    }
}
