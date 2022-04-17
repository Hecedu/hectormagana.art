export default class Comment {
    id: number;
    comment: string;
    date_added: Date;
    poster_username: string;

    constructor(
      id: number,
      comment: string,
      poster_username: string,
    ) {
      this.id = id;
      this.comment = comment;
      this.date_added = new Date();
      this.poster_username = poster_username;
    }
}  