using Portfolio_Api.Services;
using System.Text.RegularExpressions;

namespace Portfolio_Api.Models
{
    public record BlogPost
    {
        public int id { get; private set; }
        public string title { get; private set; }
        public string content { get; private set; }
        private ValidationService validationService = new ValidationService();

        public BlogPost()
        {
            id = 0;
            title = "";
            content = "";
        }

        public BlogPost setTitle(string _title)
        {
            this.title = validationService.ValidateString(_title, 150);
            return this;

        }
        public BlogPost setContent(string _content)
        {
            this.content = validationService.ValidateString(_content);
            return this;
        }
    }
}

