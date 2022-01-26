namespace Portfolio_Api.Models
{
    public record BlogPost(int id)
    {
        public string title { get; set; } = default!;
        public string content { get; set; } = default!;
    }
}
