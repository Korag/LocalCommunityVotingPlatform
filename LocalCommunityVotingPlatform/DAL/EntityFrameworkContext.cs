using LocalCommunityVotingPlatform.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace LocalCommunityVotingPlatform.DAL
{
    public class EntityFrameworkContext : IdentityDbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Resolution> Resolutions { get; set; }
        public DbSet<Vote> Votes { get; set; }
        public DbSet<CommunityName> CommunityName { get; set; }

        public EntityFrameworkContext() : base()
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source = (localdb)\\MSSQLLocalDB; Database = LocalCommunityVotingPlatformDb; Integrated Security = True");
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Vote>().HasKey(x => new { x.UserId, x.ResolutionId });

            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole { Name = "Admin", NormalizedName = "Admin".ToUpper() });

            base.OnModelCreating(modelBuilder);
        }
    }
}
