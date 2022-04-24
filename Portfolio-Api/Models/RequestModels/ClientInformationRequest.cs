namespace Portfolio_Api.Models
{
    public class ClientInformationRequest
    {
        public string? client_name { get; set; }
        public string? ip_address { get; set; }
        public string? allowed_ip_range { get; set; }
    }
}
