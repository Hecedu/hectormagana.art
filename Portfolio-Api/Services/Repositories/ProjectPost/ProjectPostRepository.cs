using Microsoft.EntityFrameworkCore;
using Portfolio_Api.Models;

namespace Portfolio_Api.Services.Repositories
{
    public class ProjectPostRepository : IProjectPostRepository
    {
        private readonly IConfiguration configuration;
        private readonly PortfolioDbContext _context;

        public ProjectPostRepository(IConfiguration configuration, PortfolioDbContext context)
        {
            this.configuration = configuration;
            _context = context;
        }
        public async Task AddProjectPostAsync(ProjectPost projectPost)
        {
            _context.projectposts.Add(projectPost);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProjectPostAsync(ProjectPost projectPost)
        {
            _context.projectposts.Remove(projectPost);
            await _context.SaveChangesAsync();
        }

        public async Task EditProjectPostAsync(ProjectPost projectPost)
        {
            _context.projectposts.Update(projectPost);
            await _context.SaveChangesAsync();
        }

        public async Task<ProjectPost> GetProjectPostAsync(int id)
        {
            return await _context.projectposts.FirstAsync(projectPost => projectPost.id == id);
        }

        public IEnumerable<ProjectPost> GetProjectPosts()
        {
            return _context.projectposts.ToList();
        }
    }
}
