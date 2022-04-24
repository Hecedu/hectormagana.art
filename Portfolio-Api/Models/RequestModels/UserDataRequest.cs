namespace Portfolio_Api.Models.RequestModels
{
    public class UserDataRequest
    {
        public int id { get; set; }
        public string? username { get; set; }
        public string? email { get; set; }
        public string? favorite_videogame { get; set; }
        public string? favorite_movie { get; set; }
        public string? favorite_book { get; set; }
        public string? favorite_album { get; set; }
    }
}
