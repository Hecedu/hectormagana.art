using Portfolio_Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Portfolio_Api.Services
{
    public class BlogRepository : IRepository
    {
        private readonly PortfolioDbContext _context;

        public BlogRepository (PortfolioDbContext context)
        {
            _context = context;
        }
        public async Task AddBlogPostAsync(BlogPost blogPost)
        {
            _context.blogposts.Add(blogPost);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBlogPostAsync(BlogPost blogPost)
        {
            _context.blogposts.Remove(blogPost);
            await _context.SaveChangesAsync();
        }

        public async Task EditBlogPostAsync(BlogPost blogPost)
        {
            _context.blogposts.Update(blogPost);
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
    }
}
