namespace Portfolio_Api.Models
{
    public record ClientInformation (int id)
    {
        public string client_name { get; set; } = default!;
        public string ip_address { get; set; } = default!;
        public DateTime date_added { get; set; } = default!;
        public string allowed_ip_range { get; set; } = default!;
        public string client_public_key { get; set; } = default!;
        public string client_private_key { get; set; } = default!;

    }
}
