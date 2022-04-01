using Microsoft.AspNetCore.Mvc;

namespace Portfolio_Api.Models.RequestModels
{
    public class PhishedUserRequest 
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}
