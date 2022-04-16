using Portfolio_Api.Models;

namespace Portfolio_Api.Services.Repositories
{
    public interface ICommentRepository
    {
        public IEnumerable<Comment> GetComments();
        public Task<Comment> GetCommentAsync(int id);
        public Task AddCommentAsync(Comment comment);
        public Task EditCommentAsync(Comment comment);
        public Task DeleteCommentAsync(Comment comment);
    }
}
