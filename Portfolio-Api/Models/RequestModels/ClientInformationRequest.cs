namespace Portfolio_Api.Models
{
    public class ClientInformationRequest
    {
        public string client_name { get; set; }
        public string ip_address { get; set; }
        public DateTime date_added { get; set; }
        public string allowed_ip_range { get; set; }
        public string client_public_key { get; set; }
        public string client_private_key { get; set; }
    }
}
