using Portfolio_Api.Services;

namespace Portfolio_Api.Models
{
    public record UserData
    {
        public int id { get; private set; }
        public string username { get; private set; }
        public string email { get; private set; }
        public string? profile_picture_key { get; private set; }
        public string favorite_videogame { get; private set; }
        public string favorite_movie { get; private set; }
        public string favorite_book { get; private set; }
        public string favorite_album { get; private set; }

        private ValidationService validationService = new ValidationService();
        public UserData()
        {
            id = 0;
            username = "Default";
            email = "Default";
            profile_picture_key = null;
            favorite_videogame = "Default";
            favorite_movie = "Default";
            favorite_book = "Default";
            favorite_album = "Default";
        }
        public UserData(string _username, string _email)
        {
            id = 0;
            username = _username;
            email = _email;
            favorite_videogame = "Default";
            favorite_movie = "Default";
            favorite_book = "Default";
            favorite_album = "Default";
        }
        public UserData setUsername(string _username)
        {
            username = validationService.ValidateString(_username, 150);
            return this;
        }
        public UserData setProfilePictureKey(string _profile_picture_key)
        {
            profile_picture_key = validationService.ValidateString(_profile_picture_key);
            return this;
        }
        public UserData setFavoriteVideogame(string favoriteVideogame)
        {
            favorite_videogame = validationService.ValidateString(favoriteVideogame, 150);
            return this;
        }
        public UserData setFavoriteMovie(string favoriteMovie)
        {
            favorite_movie = validationService.ValidateString(favoriteMovie, 150);
            return this;
        }
        public UserData setFavoriteBook(string favoriteBook)
        {
            favorite_book = validationService.ValidateString(favoriteBook, 150);
            return this;
        }
        public UserData setFavoriteAlbum(string favoriteAlbum)
        {
            favorite_album = validationService.ValidateString(favoriteAlbum, 150);
            return this;
        }
    }
}
