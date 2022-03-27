using System.Text.RegularExpressions;

namespace Portfolio_Api.Models
{
    public record ClientInformation
    {
        public int id { get; private set; }
        public string client_name { get; private set; }
        public string ip_address { get; private set; }
        public DateTime date_added { get; private set; }
        public string allowed_ip_range { get; private set; }
        public string client_public_key { get; private set; }
        public string client_private_key { get; private set; }
        public ClientInformation()
        {
            id = 0;
            client_name = "";
            ip_address = "0.0.0.0";
            date_added = new DateTime();
            allowed_ip_range = "0.0.0.0/16";
            client_public_key = "default";
            client_private_key = "default";
        }

        public ClientInformation setClientName(string _client_name)
        {
            this.client_name = ValidateString(_client_name,150);
            return this;
        }
        public ClientInformation setIpAddress(string _ip_address)
        {
            this.ip_address = ValidateString(ValidateIpAddress(_ip_address), 150);
            return this;
        }
        public ClientInformation setDateAdded(DateTime _date_added)
        {
            this.date_added = _date_added;
            return this;
        }
        public ClientInformation setAllowedIpRange(string _allowed_ip_range)
        {
            this.allowed_ip_range = ValidateString(ValidateIpRange(_allowed_ip_range), 150);
            return this;
        }
        public ClientInformation setClientPublicKey(string _client_public_key)
        {
            this.client_public_key = ValidateString(_client_public_key, 150);
            return this;
        }
        public ClientInformation setClientPrivateKey(string _client_private_key)
        {
            this.client_private_key = ValidateString(_client_private_key, 150);
            return this;
        }

        private static string ValidateIpAddress(string inputString)
        {
            var ipValidationRegex = @"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";
            if (Regex.IsMatch(inputString, ipValidationRegex))
            {
                return inputString;
            }
            throw new Exception("input is invalid");
        }
        private static string ValidateIpRange(string inputString)
        {
            var cidrValidationRegex =
                @"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\/(?:16|24|32))?$";
            if (Regex.IsMatch(inputString, cidrValidationRegex))
            {
                return inputString;
            }
            throw new Exception("input is invalid");
        }

        private static string ValidateString(string inputString)
        {
            if (string.IsNullOrEmpty(inputString)) throw new ArgumentNullException(nameof(inputString));
            return SanitizeString(inputString);
        }

        private static string ValidateString(string inputString, int maxLength)
        {
            if (string.IsNullOrEmpty(inputString)) throw new ArgumentNullException(nameof(inputString));
            inputString = SanitizeString(inputString);
            return inputString.Length <= maxLength ? inputString : inputString.Substring(0, maxLength);
        }

        private static string SanitizeString(string inputString)
        {
            return Regex.Replace(inputString, "<.*?>", String.Empty);
        }
        public int GetId()
        {
            return id;
        }
    }
}
