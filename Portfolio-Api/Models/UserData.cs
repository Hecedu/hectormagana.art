namespace Portfolio_Api.Models
{
    public record UserData(int id)
    {
        public string username { get; set; } = default!;
        public string password { get; set; } = default!;
        public byte[] salt { get; set; } = default!;
    }
}
