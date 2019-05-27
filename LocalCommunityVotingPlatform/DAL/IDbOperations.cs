using LocalCommunityVotingPlatform.Models;
using System.Collections.Generic;

namespace LocalCommunityVotingPlatform.DAL
{
    public interface IDbOperations
    {
        #region Users

        ICollection<User> GetUsers();
        User GetUserByEmail(string email);

        #endregion

        #region Resolutions

        void AddResolution(Resolution resolution);
        ICollection<Resolution> GetResolutions();

        #endregion

        void SaveChanges();
    }
}
