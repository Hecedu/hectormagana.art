using Portfolio_Api.Models;
using Microsoft.EntityFrameworkCore;

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
            _context.clientinformation.Remove(clientInformation);
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
    }
}
