using LocalCommunityVotingPlatform.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalCommunityVotingPlatform.DAL
{
    public class EntityFrameworkContext : IdentityDbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Resolution> Resolutions { get; set; }
        public DbSet<Vote> Votes { get; set; }

        public EntityFrameworkContext() : base()
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source = (localdb)\MSSQLLocalDB; Database = LocalCommunityVotingPlatformDb; Integrated Security = True");
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Vote>().HasKey(x => new { x.UserId, x.ResolutionId });
            base.OnModelCreating(modelBuilder);
        }
    }
}
