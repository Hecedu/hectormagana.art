export default class Project {
  id: number;
  title: string;
  content: string;
  extra_info: string;
  links: string[];
  image_url: string;

  constructor(
    id: number,
    title: string,
    content: string,
    extra_info: string,
    links: string[],
    image_url: string
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.extra_info = extra_info;
    this.links = links;
    this.image_url = image_url;
  }
}
