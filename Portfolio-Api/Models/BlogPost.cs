using System.Text.RegularExpressions;

namespace Portfolio_Api.Models
{
    public record BlogPost(int id)
    {
        private readonly string? _title;
        private readonly string? _content;
        public string title { 
            get =>  _title?? throw new ArgumentNullException("Argument is null");
            init => _title = ValidateString(value, 150);
        }
        public string content
        {
            get => _content ?? throw new ArgumentNullException("Argument is null");
            init => _content = ValidateString(value);
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
    }
}

