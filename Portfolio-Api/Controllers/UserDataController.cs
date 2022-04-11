using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio_Api.Models;
using Portfolio_Api.Models.RequestModels;
using Portfolio_Api.Services;
using System.Net;
using System.Text.RegularExpressions;
using System.Drawing;

namespace Portfolio_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserDataController : Controller
    {
        private IRepository _repository;
        public UserDataController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("GetUserDataByUsername"), Authorize(Roles = "Admin")]
        public async Task<UserData> GetUserDataByUsername(string username)
        {
            return await _repository.GetUserDataByUserName(username);
        }

        [HttpGet]
        [Route("GetUserDataByEmail"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUserDataByEmail(string email)
        {
            if (await IsTokenDateValid(HttpContext))
            {
                var result = await _repository.GetUserDataByEmail(email);
                return Ok(result);
            }
            return Unauthorized();
        }
        [HttpGet]
        [Route("GetOrAddUserDataByJwt"), Authorize(Roles = "User")]
        public async Task<IActionResult> GetOrAddUserDataByJwt(string jwt)
        {
            if (await IsTokenDateValid(HttpContext))
            {
                return Ok(await _repository.GetOrAddUserDataByJwt(jwt));
            }
            return Unauthorized();
        }
        [HttpPost]
        [Route("EditUserProfilePicture"), AllowAnonymous]
        public async Task<IActionResult> EditUserPfp([FromForm] IFormFile imageFile, string jwt)
        {
            if (await ImageValidationService.IsImage(imageFile))
            {
                var imageKey = Guid.NewGuid().ToString("N");
                using (var client = new AmazonS3Client("AKIAZTJSTNYA7ZBQEZWE", Environment.GetEnvironmentVariable("BucketSecret"), RegionEndpoint.USWest1))
                {
                    using (var newMemoryStream = new MemoryStream())
                    {
                        imageFile.CopyTo(newMemoryStream);

                        var uploadRequest = new TransferUtilityUploadRequest
                        {
                            InputStream = newMemoryStream,
                            Key = imageKey,
                            BucketName = "portfolioprofilepictures"
                        };

                        var fileTransferUtility = new TransferUtility(client);
                        await fileTransferUtility.UploadAsync(uploadRequest);
                    }
                }
                await _repository.EditUserDataProfilePictureByJwt(imageKey, jwt);
                return Ok();
            }
            return BadRequest();
        }
        [HttpPost]
        [Route("EditUserData"), Authorize(Roles = "User")]
        public async Task<IActionResult> EditUserData([FromBody] UserDataRequest userData)
        {
            await _repository.EditUserDataAsync(userData);
            return Ok();

            return Unauthorized();
        }

        private async Task<bool> IsTokenDateValid(HttpContext currentContext)
        {
            string? token = await currentContext.GetTokenAsync("access_token");
            if (token != null && await _repository.IsTokenValid(token))
            {
                return true;
            }
            return false;
        }

    }
}
