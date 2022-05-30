namespace Portfolio_Api.Models.RequestModels
{
    public class ProjectPostRequest
    {
        public int id;
        public string? title;
        public string? content;
        public string? extra_info;
        public string[]? links;
        public string? image_url;
    }
}
