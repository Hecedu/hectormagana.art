using Google.Apis.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio_Api.Models;
using Portfolio_Api.Services;
using System.Net;

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

        [HttpPost]
        [Route("AddUserData"), AllowAnonymous]
        public async Task<HttpResponseMessage> Post([FromBody] UserData userData)
        {
            await _repository.AddUserData(userData);
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            var cookieOptions = new CookieOptions
            {
                Secure = true,
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.Now.AddMinutes(5)
            };
            Response.Cookies.Append(userData.username, "Accept the cookies bruh.", cookieOptions);
            return response;
        }

        [HttpGet]
        [Route("GetUserDataByUsername"), AllowAnonymous]
        public async Task<UserData> GetUserDataByUsername(string username)
        {
            return await _repository.GetUserDataByUserName(username);
        }

        [HttpGet]
        [Route("GetUserDataByEmail"), Authorize(Roles = "User")]
        public async Task<IActionResult> GetUserDataByEmail(string email)
        {
            string? token = await HttpContext.GetTokenAsync("access_token");
            if (token != null && await _repository.IsTokenValid(token))
            {

                var result = await _repository.GetUserDataByEmail(email);
                return Ok(result);
            }
            else
            {
                return Unauthorized();
            }
        }
        [HttpGet]
        [Route("GetOrAddUserDataByJwt"), Authorize(Roles = "User")]
        public async Task<IActionResult> GetOrAddUserDataByJwt(string jwt)
        {
            string? token = await HttpContext.GetTokenAsync("access_token");
            if (token != null && await _repository.IsTokenValid(token))
            {
                return Ok(await _repository.GetOrAddUserDataByJwt(jwt));
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        [Route("EditUserData"), Authorize(Roles = "User")]
        public async Task<IActionResult> EditUserData(UserData userData)
        {
            string? token = await HttpContext.GetTokenAsync("access_token");
            if (token != null && await _repository.IsTokenValid(token))
            {
                await _repository.EditUserDataAsync(userData);
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }

    }
}
