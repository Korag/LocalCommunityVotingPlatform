using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalCommunityVotingPlatform.Models
{
    public class Vote
    {
        public string UserId { get; set; }
        public virtual User User { get; set; }

        public string ResolutionId { get; set; }
        public virtual Resolution Resolution { get; set; }

        public string ChosenOption { get; set; }
        public DateTime DateOfVoting { get; set; }
    }
}
