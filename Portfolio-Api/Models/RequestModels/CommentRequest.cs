namespace Portfolio_Api.Models.RequestModels
{
    public class CommentRequest
    {
        public int id { get; set; }
        public string comment { get; set; }
        public DateTime date_added { get; set; }
        public string poster_username { get; set; }

    }
}
