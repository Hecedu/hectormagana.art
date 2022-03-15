using System.Text.RegularExpressions;

namespace Portfolio_Api.Models
{
    public record ClientInformation (int id)
    {
        private readonly string? _client_name;
        private readonly string? _ip_address;
        private readonly DateTime? _date_added;
        private readonly string? _allowed_ip_range;
        private readonly string? _client_public_key;
        private readonly string? _client_private_key;
        public string client_name
        {
            get => _client_name ?? throw new ArgumentNullException("Argument is null");
            init => _client_name = ValidateString(value, 150);
        }
        public string ip_address
        {
            get => _ip_address ?? throw new ArgumentNullException("Argument is null");
            init => _ip_address = ValidateString(ValidateIpRange(value), 150);
        }
        public DateTime date_added
        {
            get => _date_added ?? throw new ArgumentNullException("Argument is null");
            init => _date_added = value;
        }
        public string allowed_ip_range
        {
            get => _allowed_ip_range ?? throw new ArgumentNullException("Argument is null");
            init => _allowed_ip_range = ValidateString(ValidateIpRange(value), 150);
        }
        public string client_public_key
        {
            get => _client_public_key ?? throw new ArgumentNullException("Argument is null");
            init => _client_public_key = ValidateString(value, 150);
        }
        public string client_private_key
        {
            get => _client_private_key ?? throw new ArgumentNullException("Argument is null");
            init => _client_private_key = ValidateString(value, 150);
        }
        public static string ValidateIpAddress(string inputString)
        {
            var ipValidationRegex = @"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";
            if (Regex.IsMatch(inputString, ipValidationRegex))
            {
                return inputString;
            }
            throw new Exception("input is invalid");
        }
        public static string ValidateIpRange(string inputString)
        {
            var cidrValidationRegex = @"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\/(?:16|24))?$";
            if (Regex.IsMatch(inputString, cidrValidationRegex))
            {
                return inputString;
            }
            throw new Exception("input is invalid");
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
