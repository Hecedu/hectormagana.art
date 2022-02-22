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
        [Route("AddUserData")]
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
        [Route("GetUserDataByUsername")]
        public async Task<UserData> GetClientInformation(string username)
        {
            return await _repository.GetUserData(username);
        }
    }
}
