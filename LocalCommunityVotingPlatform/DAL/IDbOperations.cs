using LocalCommunityVotingPlatform.Models;
using System.Collections.Generic;

namespace LocalCommunityVotingPlatform.DAL
{
    public interface IDbOperations
    {
        ICollection<User> GetUsers();
        User GetUserByEmail(string email);

        void SaveChanges();
    }
}
