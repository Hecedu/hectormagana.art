using Portfolio_Api.Models;

namespace Portfolio_Api.Services
{
    public interface IRepository
    {
        public IEnumerable<BlogPost> GetBlogPosts();
        public Task<BlogPost> GetBlogPostAsync(int id);
        public Task AddBlogPostAsync(BlogPost blogPost);
        public Task EditBlogPostAsync (BlogPost blogPost);
        public Task DeleteBlogPostAsync (BlogPost blogPost);
        public IEnumerable<ClientInformation> GetClientInformation();
        public Task<ClientInformation> GetClientInformation(int id);
        public Task AddClientInformationAsync(ClientInformation clientInformation);
        public Task EditClientInformationAsync(ClientInformation clientInformation);
        public Task DeleteClientInformationAsync(ClientInformation clientInformation);
        public Task AddUserData(UserData userData);
        public Task<UserData> GetUserDataByUserName (string username);
        public Task<UserData> GetuserDataByEmail(string email);
        public Task EditUserDataAsync(UserData userData);
        public Task DeleteUserDataAsync (UserData userData);

    }
}
