using LocalCommunityVotingPlatform.Models;
using System.Collections.Generic;

namespace LocalCommunityVotingPlatform.DAL
{
    public interface IDbOperations
    {
        string GetCommunityName();
        void SetCommunityName(string name);

        #region Users

        ICollection<User> GetUsers();
        User GetUserByEmail(string email);

        #endregion

        #region Resolutions

        void AddResolution(Resolution resolution);
        ICollection<Resolution> GetResolutions();
        Resolution GetResolutionById(string resolutionId);
        void RemoveResolution(string resolutionId);
        int GetResolutionsCountByMonth(int month);
        ICollection<Resolution> GetActiveResolutions();
        ICollection<Resolution> GetArchiveResolutions();
        void RemoveRelatedResolutionVotes(string resolutionId);

        #endregion

        #region Votes

        bool CheckIfVoteExist(string resolutionId, string userId);
        void AddVote(Vote vote);
        Vote GetVote(string resolutionId, string userId);
        int GetVotesQuantity(string resolutionId);
        int GetNoVotesQuantity(int voteQuantity);
        int[] GetQuantityOfConcreteOptions(string resolutionId);
        int[] GetPercentageQuantityOfConcreteOptions(string resolutionId);
        #endregion

        void SaveChanges();
    }
}
