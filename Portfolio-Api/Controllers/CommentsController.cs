using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio_Api.Models;
using Portfolio_Api.Models.RequestModels;
using Portfolio_Api.Services.Repositories;

namespace Portfolio_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommentsController : ControllerBase
    {
        private ICommentRepository commentRepository;
        public CommentsController(ICommentRepository commentRepository)
        {
            this.commentRepository = commentRepository;
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetComments()
        {
            var comments = await commentRepository.GetCommentsAsync();
            return Ok(comments);
        }
        [HttpPost]
        [Route("AddComment"), Authorize(Roles = "User")]
        public async Task<IActionResult> AddComment(CommentRequest comment, string jwt)
        {
            await commentRepository.AddCommentAsync(comment, jwt);
            return Ok();
        }
        [HttpPost]
        [Route("AddAnonymousComment"), AllowAnonymous]
        public async Task<IActionResult> AddComment(CommentRequest comment)
        {
            await commentRepository.AddCommentAsync(comment);
            return Ok();
        }
        [HttpDelete]
        [Route("DeleteComment"), Authorize(Roles = "User")]
        public async Task<IActionResult> DeleteComment(CommentRequest comment, string jwt)
        {
            await commentRepository.DeleteCommentAsync(comment, jwt);
            return Ok();
        }
    }
}
