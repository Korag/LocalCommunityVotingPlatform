using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LocalCommunityVotingPlatform.Models;

namespace LocalCommunityVotingPlatform.DAL
{
    public class DbOperations : IDbOperations
    {
        private EntityFrameworkContext _context;

        public DbOperations()
        {
            _context = new EntityFrameworkContext();
            _context.Database.EnsureCreated();
        }

        public ICollection<User> GetUsers()
        {
            return _context.Users.ToList();
        }

        public User GetUserByEmail(string email)
        {
            return _context.Users.Where(z=> z.Email == email).FirstOrDefault();
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public void AddResolution(Resolution resolution)
        {
            _context.Resolutions.Add(resolution);
        }
    }
}
