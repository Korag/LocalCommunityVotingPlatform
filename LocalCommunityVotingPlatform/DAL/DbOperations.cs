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

        public User GetUserById(string id)
        {
            return _context.Users.Where(z=> z.Id == id).FirstOrDefault();
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
