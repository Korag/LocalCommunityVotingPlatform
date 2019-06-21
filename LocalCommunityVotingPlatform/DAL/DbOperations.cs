using System;
using System.Collections.Generic;
using System.Linq;
using LocalCommunityVotingPlatform.Models;
using Microsoft.Extensions.Configuration;

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

        public ICollection<Resolution> GetActiveResolutions()
        {
            return _context.Resolutions.Where(z => z.ActiveToVoteBeforeDate > DateTime.Now).ToList();
        }

        public ICollection<Resolution> GetArchiveResolutions()
        {
            return _context.Resolutions.Where(z => z.ActiveToVoteBeforeDate < DateTime.Now).ToList();
        }

        public Resolution GetResolutionById(string resolutionId)
        {
            return _context.Resolutions.Where(z => z.Id == resolutionId).FirstOrDefault();
        }

        public void RemoveResolution(string resolutionId)
        {
            Resolution resolution = _context.Resolutions.Where(z => z.Id == resolutionId).FirstOrDefault();
            _context.Resolutions.Remove(resolution);
        }
        public int GetResolutionsCountByMonth(int month)
        {
           return  _context.Resolutions.Where(z => z.Date.Month == month).Count();
        }

        #endregion

        #region Votes

        public bool CheckIfVoteExist(string resolutionId, string userId)
        {
            if (_context.Votes.Where(z=> z.ResolutionId == resolutionId && z.UserId == userId).Count() != 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public void AddVote(Vote vote)
        {
            _context.Votes.Add(vote);
            SaveChanges();
            var test = _context.Votes.ToList();
        }

        public Vote GetVote(string resolutionId, string userId)
        {
            Vote vote = _context.Votes.Where(z => z.ResolutionId == resolutionId && z.UserId == userId).FirstOrDefault();
            return vote;
        }

        public int GetVotesQuantity(string resolutionId)
        {
            int votesQuantity = _context.Votes.Where(z => z.ResolutionId == resolutionId).Count();
            return votesQuantity;
        }

        public int[] GetQuantityOfConcreteOptions(string resolutionId)
        {
            int[] arrayWithStatistics = new int[3];

            for (int i = 1; i < 4; i++)
            {
                arrayWithStatistics[i - 1] = _context.Votes.Where(z => z.ResolutionId == resolutionId && z.ChosenOption == i.ToString()).Count();
            }

            return arrayWithStatistics;
        }

        #endregion
    }
}
