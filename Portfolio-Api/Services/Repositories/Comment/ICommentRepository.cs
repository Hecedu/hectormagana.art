using Portfolio_Api.Models;
using Portfolio_Api.Models.RequestModels;

namespace Portfolio_Api.Services.Repositories
{
    public interface ICommentRepository
    {
        public Task<IEnumerable<Comment>> GetCommentsAsync();
        public Task<Comment> GetCommentAsync(int id);
        public Task AddCommentAsync(CommentRequest comment);
        public Task AddCommentAsync(CommentRequest comment, string jwt);
        public Task EditCommentAsync(CommentRequest comment);
        public Task DeleteCommentAsync(CommentRequest comment, string jwt);
    }
}
