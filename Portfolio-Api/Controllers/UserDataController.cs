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
using Portfolio_Api.Services.Repositories;

namespace Portfolio_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserDataController : Controller
    {
        private IUserDataRepository userDataRepository;
        private ITokenRepository tokenRepository;
        public UserDataController(IUserDataRepository userDataRepository, ITokenRepository tokenRepository)
        {
            this.userDataRepository = userDataRepository;
            this.tokenRepository = tokenRepository;
        }

        [HttpGet]
        [Route("GetUserDataByUsername"), Authorize(Roles = "Admin")]
        public async Task<UserData> GetUserDataByUsername(string username)
        {
            return await userDataRepository.GetUserDataByUserName(username);
        }

        [HttpGet]
        [Route("GetUserDataByEmail"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUserDataByEmail(string email)
        {
            if (await IsTokenDateValid(HttpContext))
            {
                var result = await userDataRepository.GetUserDataByEmail(email);
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
                return Ok(await userDataRepository.GetOrAddUserDataByJwt(jwt));
            }
            return Unauthorized();
        }
        [HttpPost]
        [Route("EditUserProfilePicture"), Authorize(Roles = "User")]
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
                await userDataRepository.EditUserDataProfilePictureByJwt(imageKey, jwt);
                return Ok();
            }
            return BadRequest();
        }
        [HttpPost]
        [Route("EditUserData"), Authorize(Roles = "User")]
        public async Task<IActionResult> EditUserData([FromBody] UserDataRequest userData)
        {
            await userDataRepository.EditUserDataAsync(userData);
            return Ok();

            return Unauthorized();
        }

        private async Task<bool> IsTokenDateValid(HttpContext currentContext)
        {
            string? token = await currentContext.GetTokenAsync("access_token");
            if (token != null && await tokenRepository.IsTokenValid(token))
            {
                return true;
            }
            return false;
        }

    }
}
