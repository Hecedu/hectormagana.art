using Portfolio_Api.Services;

namespace Portfolio_Api.Models
{
    public record ProjectPost
    {
        public int id { get; private set; }
        public string title { get; private set; }
        public string content { get; private set; }
        public string extra_info { get; private set; }
        public string image_url { get; private set; }
        private ValidationService validationService = new ValidationService();

        public ProjectPost()
        {
            id = 0;
            title = "";
            content = "";
            extra_info = "";
            image_url = "";
        }

        public ProjectPost setTitle(string _title)
        {
            this.title = validationService.ValidateString(_title, 150);
            return this;

        }
        public ProjectPost setContent(string _content)
        {
            this.content = validationService.ValidateString(_content, 600);
            return this;
        }
        public ProjectPost setExtraInfo(string _extra_info)
        {
            this.extra_info = validationService.ValidateString(_extra_info, 300);
            return this;
        }
        public ProjectPost setImageUrl(string _image_url)
        {
            this.image_url = validationService.ValidateString(_image_url, 300);
            return this;
        }
    }
}
