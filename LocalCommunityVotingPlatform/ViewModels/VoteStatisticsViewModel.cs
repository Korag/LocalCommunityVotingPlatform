using System.Collections.Generic;

namespace LocalCommunityVotingPlatform.ViewModels
{
    public class VoteStatisticsViewModel
    {
        public int VoteQuantity { get; set; }
        public int NoVoteQuantity { get; set; }
        public int[] ArrayWithStatistics { get; set; }
        public ICollection<DisplayUserCredentials> UsersData { get; set; }
    }
}
