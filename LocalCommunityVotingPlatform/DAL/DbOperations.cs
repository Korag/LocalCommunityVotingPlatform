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

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        #region Users
        public ICollection<User> GetUsers()
        {
            return _context.Users.ToList();
        }

        public User GetUserByEmail(string email)
        {
            return _context.Users.Where(z => z.Email == email).FirstOrDefault();
        }

        #endregion

        #region Resolutions
        public void AddResolution(Resolution resolution)
        {
            _context.Resolutions.Add(resolution);
        }

        public ICollection<Resolution> GetResolutions()
        {
            return _context.Resolutions.ToList();
        }

        public Resolution GetResolutionById(string resolutionId)
        {
            return _context.Resolutions.Where(z => z.Id == resolutionId).FirstOrDefault();
        }

        #endregion

    }
}
