export default class User {
    id: number;
    givenName: string;
    familyName: string;
    picture: string;
    email: string;
  
    constructor(
      id: number,
      givenName: string,
      familyName: string,
      picture: string,
      email: string
    ) {
      this.id = id;
      this.givenName = givenName;
      this.familyName = familyName;
      this.picture = picture;
      this.email = email;
    }
}  