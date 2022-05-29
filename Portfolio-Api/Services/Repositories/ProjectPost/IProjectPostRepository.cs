using Portfolio_Api.Models;

namespace Portfolio_Api.Services.Repositories
{
    public interface IProjectPostRepository
    {
        public IEnumerable<ProjectPost> GetProjectPosts();
        public Task<ProjectPost> GetProjectPostAsync(int id);
        public Task AddProjectPostAsync(ProjectPost projectPost);
        public Task EditProjectPostAsync(ProjectPost projectPost);
        public Task DeleteProjectPostAsync(ProjectPost projectPost);

    }
}    

