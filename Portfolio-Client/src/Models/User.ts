export default class User {
    id: number;
    username: string;
    email: string;
    favorite_videogame: string;
    favorite_movie: string;
    favorite_book: string;
    favorite_album: string;
  
    constructor(
      id: number,
      username: string,
      email: string,
      favorite_videogame: string,
      favorite_movie: string,
      favorite_book: string,
      favorite_album: string
    ) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.favorite_videogame = favorite_videogame;
      this.favorite_movie = favorite_movie;
      this.favorite_book = favorite_book;
      this.favorite_album = favorite_album;
    }
}  