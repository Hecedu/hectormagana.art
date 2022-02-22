using Portfolio_Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Portfolio_Api.Services
{
    public class ApiRepository : IRepository
    {
        private readonly PortfolioDbContext _context;

        public ApiRepository (PortfolioDbContext context)
        {
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
            byte[] salt = new byte[128/8];
            var rng = RandomNumberGenerator.Create();
            rng.GetBytes(salt);

            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: userData.password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));
            userData.password = hashedPassword;
            userData.salt = salt;
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
            _context.userdata.Update(userData);
            await _context.SaveChangesAsync();
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

        public async Task<UserData> GetUserData(string username)
        {
            return await _context.userdata.FirstAsync(userdata => userdata.username == username);
        }
    }
}
