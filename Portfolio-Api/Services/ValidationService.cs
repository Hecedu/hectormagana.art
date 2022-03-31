using System.Text.RegularExpressions;

namespace Portfolio_Api.Services
{
    public class ValidationService
    {
        public string ValidateIpAddress(string inputString)
        {
            var ipValidationRegex = @"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";
            if (Regex.IsMatch(inputString, ipValidationRegex))
            {
                return inputString;
            }
            throw new Exception("input is invalid");
        }
        public string ValidateIpRange(string inputString)
        {
            var cidrValidationRegex =
                @"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\/(?:16|24|32))?$";
            if (Regex.IsMatch(inputString, cidrValidationRegex))
            {
                return inputString;
            }
            throw new Exception("input is invalid");
        }

        public string ValidateString(string inputString)
        {
            if (string.IsNullOrEmpty(inputString)) throw new ArgumentNullException(nameof(inputString));
            return SanitizeString(inputString);
        }
        public string ValidateString(string inputString, int maxLength)
        {
            if (string.IsNullOrEmpty(inputString)) throw new ArgumentNullException(nameof(inputString));
            inputString = SanitizeString(inputString);
            return inputString.Length <= maxLength ? inputString : inputString.Substring(0, maxLength);
        }
        public string SanitizeString(string inputString)
        {
            return Regex.Replace(inputString, "<.*?>", String.Empty);
        }
    }
}
