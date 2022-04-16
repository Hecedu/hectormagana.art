using Microsoft.EntityFrameworkCore;
using Portfolio_Api.Models;

namespace Portfolio_Api.Services.Repositories
{
    public class CommentRepository : ICommentRepository
    {

        private readonly IConfiguration configuration;
        private readonly PortfolioDbContext _context;

        public CommentRepository(IConfiguration configuration, PortfolioDbContext context)
        {
            this.configuration = configuration;
            _context = context;
        }

        public async Task AddCommentAsync(Comment comment)
        {
            _context.comments.Add(comment);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCommentAsync(Comment comment)
        {
            var commentToDelete = await _context.comments.FirstOrDefaultAsync(_comment => _comment.id == comment.id);
            if (commentToDelete != null)
            {
                _context.comments.Remove(commentToDelete);
                await _context.SaveChangesAsync();
            }
        }

        public async Task EditCommentAsync(Comment comment)
        {
            var commentToEdit = await _context.comments.FirstAsync(_comment => _comment.id == comment.id);
            if (commentToEdit != null)
            {
                commentToEdit.setComment(comment.comment);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Comment> GetCommentAsync(int id)
        {
            return await _context.comments.FirstAsync(comment => comment.id == id);
        }

        public IEnumerable<Comment> GetBlogPosts()
        {
            return _context.comments.ToList();
        }

        public IEnumerable<Comment> GetComments()
        {
            throw new NotImplementedException();
        }
    }
}