using Portfolio_Api.Services;
using System.Text.RegularExpressions;

namespace Portfolio_Api.Models
{
    public record Comment
    {
        public int id { get; private set; }
        public string comment { get; private set; }
        public DateTime date_added { get; private set; }
        public string poster_username { get; private set; }

        private ValidationService validationService = new ValidationService();

        public Comment()
        {
            id = 0;
            date_added = DateTime.Now;
            comment = "";
            poster_username = "Anonymous";
        }

        public Comment setComment(string _comment)
        {
            this.comment = validationService.ValidateString(_comment, 280);
            return this;

        }
        public Comment setPosterUsername(string _username)
        {
            this.poster_username = validationService.ValidateString(_username, 150);
            return this;
        }
    }
}

