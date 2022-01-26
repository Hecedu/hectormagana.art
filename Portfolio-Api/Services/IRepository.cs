using Portfolio_Api.Models;

namespace Portfolio_Api.Services
{
    public interface IRepository
    {
        public IEnumerable<BlogPost> GetBlogPosts();
        public Task<BlogPost> GetBlogPostAsync(int id);
        public Task AddBlogPostAsync(BlogPost blogPost);
        public Task EditBlogPostAsync (BlogPost blogPost);
        public Task DeleteBlogPostAsync (BlogPost blogPost);
    }
}
