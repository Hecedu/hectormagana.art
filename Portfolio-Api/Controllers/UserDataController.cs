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
        public async Task<UserData> GetUserDataByEmail(string email)
        {
            return await _repository.GetuserDataByEmail(email);
        }
        [HttpPost]
        [Route("EditUserData"), Authorize(Roles = "User")]
        public async Task EditUserData(UserData userData)
        {
            await _repository.EditUserDataAsync(userData);

        }
    }
}
