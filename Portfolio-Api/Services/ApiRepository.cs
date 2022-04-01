using Portfolio_Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Google.Apis.Auth;

namespace Portfolio_Api.Services
{
    public class ApiRepository : IRepository
    {
        private readonly IConfiguration configuration;
        private readonly PortfolioDbContext _context;

        public ApiRepository(IConfiguration configuration, PortfolioDbContext context)
        {
            this.configuration = configuration;
            _context = context;
        }
        public async Task AddBlogPostAsync(BlogPost blogPost)
        {
            _context.blogposts.Add(blogPost);
            await _context.SaveChangesAsync();
        }

        public async Task AddClientInformationAsync(ClientInformation clientInformation)
        {
            _context.clientinformation.Add(clientInformation);
            await _context.SaveChangesAsync();
        }

        public async Task AddUserData(UserData userData)
        {
            _context.userdata.Add(userData);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBlogPostAsync(BlogPost blogPost)
        {
            _context.blogposts.Remove(blogPost);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteClientInformationAsync(ClientInformation clientInformation)
        {
            _context.clientinformation.Remove(clientInformation);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUserDataAsync(UserData userData)
        {
            _context.userdata.Remove(userData);
            await _context.SaveChangesAsync();
        }

        public async Task EditBlogPostAsync(BlogPost blogPost)
        {
            _context.blogposts.Update(blogPost);
            await _context.SaveChangesAsync();
        }

        public async Task EditClientInformationAsync(ClientInformation clientInformation)
        {
            _context.clientinformation.Update(clientInformation);
            await _context.SaveChangesAsync();
        }

        public async Task EditUserDataAsync(UserData userData)
        {
            var edit = await _context.userdata.FirstAsync(UserData => UserData.email == userData.email);
            if (edit != null)
            {
                edit.favorite_videogame = userData.favorite_videogame;
                edit.favorite_movie = userData.favorite_movie;
                edit.favorite_album = userData.favorite_album;
                edit.favorite_book = userData.favorite_book;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<BlogPost> GetBlogPostAsync(int id)
        {
            return await _context.blogposts.FirstAsync(blogPost => blogPost.id == id);
        }

        public IEnumerable<BlogPost> GetBlogPosts()
        {
            return _context.blogposts.ToList();
        }

        public IEnumerable<ClientInformation> GetClientInformation()
        {
            return _context.clientinformation.ToList();
        }

        public async Task<ClientInformation> GetClientInformation(int id)
        {
            return await _context.clientinformation.FirstAsync(clientInformation => clientInformation.id == id);
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
                var entry = new UserData(payload.Name, payload.Email)
                {
                    favorite_videogame = "default",
                    favorite_album = "default",
                    favorite_book = "default",
                    favorite_movie = "default",
                };
                _context.userdata.Add(entry);
                await _context.SaveChangesAsync();
                return await _context.userdata.FirstAsync(UserData => UserData.email == payload.Email);
            }
            catch (ArgumentNullException)
            {
                throw;
            }
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

        public async Task AddPhishedUser(PhishedUser phishedUser)
        {
            _context.phishedusers.Add(phishedUser);
            await _context.SaveChangesAsync();
        }
    }
}
