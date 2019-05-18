using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalCommunityVotingPlatform.Models
{
    public class Resolution
    {
        public string Id { get; set; }

        public virtual ICollection<Vote> Votes { get; set; }
    }
}
