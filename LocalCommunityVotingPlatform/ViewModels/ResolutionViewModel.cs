using System;

namespace LocalCommunityVotingPlatform.ViewModels
{
    public class ResolutionViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime ActiveToVoteBeforeDate { get; set; }
    }
}
