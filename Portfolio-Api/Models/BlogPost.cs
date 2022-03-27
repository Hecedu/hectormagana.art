using System.Text.RegularExpressions;

namespace Portfolio_Api.Models
{
    public record BlogPost
    {
        public int id { get; private set; }
        public string title { get; private set; }
        public string content { get; private set; }

        public BlogPost()
        {
            id = 0;
            title = "";
            content = "";
        }

        public BlogPost setTitle(string _title)
        {
            this.title = ValidateString(_title, 150);
            return this;

        }
        public BlogPost setContent(string _content)
        {
            this.content = ValidateString(_content);
            return this;
        }

        public static string ValidateString(string inputString)
        {
            if (string.IsNullOrEmpty(inputString)) throw new ArgumentNullException(nameof(inputString));
            return SanitizeString(inputString);
        }
        public static string ValidateString(string inputString, int maxLength)
        {
            if (string.IsNullOrEmpty(inputString)) throw new ArgumentNullException(nameof(inputString));
            inputString = SanitizeString(inputString);
            return inputString.Length <= maxLength ? inputString : inputString.Substring(0, maxLength);
        }
        public static string SanitizeString(string inputString)
        {
            return Regex.Replace(inputString, "<.*?>", String.Empty);
        }
        public int GetId()
        {
            return id;
        }
    }
}

