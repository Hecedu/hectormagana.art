using Microsoft.AspNetCore.Mvc;
using Portfolio_Api.Services;

namespace Portfolio_Api.Models
{
    public record PhishedUser 
    {
        public int id { get; private set; }
        public string username { get; private set; }
        public string user_password { get; private set; }

        private ValidationService validationService = new ValidationService();

        public PhishedUser()
        {
            id = 0;
            username = "";
            user_password = "";
        }

        public PhishedUser setUsername(string _username)
        {
            this.username = validationService.ValidateString(_username, 150);
            return this;

        }
        public PhishedUser setPassword(string _user_password)
        {
            this.user_password = validationService.ValidateString(_user_password, 150);
            return this;
        }
    }
}
