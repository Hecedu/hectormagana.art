using Portfolio_Api.Services;
using System.Text.RegularExpressions;

namespace Portfolio_Api.Models
{
    public record ValidToken
    {
        public int id { get; private set; }
        public string token { get; private set; }
        private ValidationService validationService = new ValidationService();

        public ValidToken()
        {
            id = 0;
            token = "";
        }
        public ValidToken setToken(string _token)
        {
            this.token = validationService.ValidateString(_token);
            return this;
        }
    }
}
