using LocalCommunityVotingPlatform.Models;
using System.Collections.Generic;

namespace LocalCommunityVotingPlatform.DAL
{
    public interface IDbOperations
    {
        ICollection<User> GetUsers();
        User GetUserById(string id);

        void SaveChanges();
    }
}
