using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using LocalCommunityVotingPlatform.DAL;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace LocalCommunityVotingPlatform.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class VoteController : ControllerBase
    {
        private IDbOperations _context;

        public VoteController(IDbOperations context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public string GetUserEmailFromRequest()
        {
            var UserIdentity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> UserClaims = UserIdentity.Claims;

            var UserEmail = UserClaims.ElementAt(0).Value;

            return UserEmail;
        }

        [HttpGet]
        [Authorize]
        public bool CheckIfAlreadyVotedForResolution(string resolutionId)
        {
            string userId = _context.GetUserByEmail(GetUserEmailFromRequest()).Id;

            bool voteExist = _context.CheckIfVoteExist(resolutionId, userId);

            return voteExist;
        }
    }
}
