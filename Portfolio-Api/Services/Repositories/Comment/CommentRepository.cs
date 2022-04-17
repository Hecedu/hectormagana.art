using Google.Apis.Auth;
using Microsoft.EntityFrameworkCore;
using Portfolio_Api.Models;
using Portfolio_Api.Models.RequestModels;

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

        public async Task AddCommentAsync(CommentRequest commentRequest)
        {
            var validatedComment = new Comment()
                .setComment(commentRequest.comment);
            _context.comments.Add(validatedComment);
            await _context.SaveChangesAsync();
        }
        public async Task AddCommentAsync(CommentRequest commentRequest, string jwt)
        {
            GoogleJsonWebSignature.ValidationSettings settings = new GoogleJsonWebSignature.ValidationSettings();
            settings.Audience = new List<string>() { configuration.GetSection("AppSettings:GoogleId").Value };
            GoogleJsonWebSignature.Payload payload = GoogleJsonWebSignature.ValidateAsync(jwt, settings).Result;
            var validatedComment = new Comment()
                .setComment(commentRequest.comment)
                .setPosterUsername(payload.Name);
            _context.comments.Add(validatedComment);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCommentAsync(CommentRequest comment, string jwt)
        {
            GoogleJsonWebSignature.ValidationSettings settings = new GoogleJsonWebSignature.ValidationSettings();
            settings.Audience = new List<string>() { configuration.GetSection("AppSettings:GoogleId").Value };
            GoogleJsonWebSignature.Payload jwtPayload = GoogleJsonWebSignature.ValidateAsync(jwt, settings).Result;

            var commentToDelete = await _context.comments.FirstOrDefaultAsync(_comment => _comment.id == comment.id);

            if (commentToDelete != null && commentToDelete.poster_username == jwtPayload.Name)
            {
                _context.comments.Remove(commentToDelete);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new UnauthorizedAccessException();
            }
        }

        public async Task EditCommentAsync(CommentRequest comment)
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

        public async Task<IEnumerable<Comment>> GetCommentsAsync()
        {
            return await _context.comments.ToListAsync();
        }
    }
}