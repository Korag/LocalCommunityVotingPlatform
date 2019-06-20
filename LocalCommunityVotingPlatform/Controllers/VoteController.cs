using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using LocalCommunityVotingPlatform.DAL;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using LocalCommunityVotingPlatform.Models;
using System;

namespace LocalCommunityVotingPlatform.Controllers
{
    public enum VoteChosenOption {
        Empty,
        For,
        Against,
        Abstain
    }


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

        [HttpPost]
        [Authorize]
        public ActionResult<Vote> VoteForResolution(string resolutionId, string chosenOption)
        {
            int EnumValue = Int32.Parse(chosenOption);

            if (Enum.GetName(typeof(VoteChosenOption), EnumValue) == Enum.GetName(typeof(VoteChosenOption), 0))
            {
                return BadRequest();
            }
            else
            {
                string userId = _context.GetUserByEmail(GetUserEmailFromRequest()).Id;

                Vote newVote = new Vote
                {
                    UserId = userId,
                    ResolutionId = resolutionId,

                    DateOfVoting = DateTime.Now,
                    ChosenOption = Enum.GetName(typeof(VoteChosenOption), EnumValue)
                };

                _context.AddVote(newVote);

                return Ok();
            }
        }
    }
}
