using System;

namespace LocalCommunityVotingPlatform.ViewModels
{
    public class DisplayResolutionViewModel
    {
        public string Id { get; set; }

        public DateTime Date { get; set; }
        public string Indexer { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime ActiveToVoteBeforeDate { get; set; }

        public string Edit { get; set; }
        public string Delete { get; set; }
    }
}
