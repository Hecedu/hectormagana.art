using Microsoft.EntityFrameworkCore;

namespace Portfolio_Api.Models
{
    public class PortfolioDbContext : DbContext
    {
        public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : base(options)
        {

        }
        public DbSet<BlogPost> blogposts => Set<BlogPost>();
    }
}
