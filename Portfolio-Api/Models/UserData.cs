namespace Portfolio_Api.Models
{
    public class UserData
    {
        public UserData()
        {

        }
        public UserData(string _username, string _email)
        {
            id = 0;
            username = _username;
            email = _email;
            favorite_videogame = "not set";
            favorite_movie = "not set";
            favorite_book = "not set";
            favorite_album = "not set";
        }
        public int id { get; set; }
        public string username { get; set; }
        public string email { get; set; } 
        public string favorite_videogame { get; set; } 
        public string favorite_movie { get; set; } 
        public string favorite_book { get; set; }
        public string favorite_album { get; set; }
    }
}
