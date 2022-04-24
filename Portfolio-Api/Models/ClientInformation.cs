using Portfolio_Api.Services;
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
        public bool approved { get; set; }
        private ValidationService validationService = new ValidationService();
        public ClientInformation()
        {
            id = 0;
            client_name = "";
            ip_address = "0.0.0.0";
            date_added = DateTime.Now.ToUniversalTime();
            allowed_ip_range = "0.0.0.0/16";
            approved = false;
        }

        public ClientInformation setClientName(string _client_name)
        {
            this.client_name = validationService.ValidateString(_client_name,150);
            return this;
        }
        public ClientInformation setIpAddress(string _ip_address)
        {
            this.ip_address = validationService.ValidateString(validationService.ValidateIpAddress(_ip_address), 150);
            return this;
        }
        public ClientInformation setDateAdded(DateTime _date_added)
        {
            this.date_added = _date_added;
            return this;
        }
        public ClientInformation setAllowedIpRange(string _allowed_ip_range)
        {
            this.allowed_ip_range = validationService.ValidateString(validationService.ValidateIpRange(_allowed_ip_range), 150);
            return this;
        }
        public ClientInformation setApproved(bool _approved)
        {
            this.approved = _approved;
            return this;
        }
    }
}
