using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using LocalCommunityVotingPlatform.DAL;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using LocalCommunityVotingPlatform.Models;
using System;
using LocalCommunityVotingPlatform.ViewModels;
using Microsoft.AspNetCore.Identity;

namespace LocalCommunityVotingPlatform.Controllers
{
    public enum VoteChosenOption
    {
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

        [HttpGet]
        [Authorize]
        public bool CheckIfAlreadyAdminVotedForResolution(string resolutionId, string userId)
        {
            bool voteExist = _context.CheckIfVoteExist(resolutionId, userId);

            return voteExist;
        }

        [HttpGet]
        [Authorize]
        public Vote GetVote(string resolutionId)
        {
            string userId = _context.GetUserByEmail(GetUserEmailFromRequest()).Id;

            Vote vote = _context.GetVote(resolutionId, userId);

            return vote;
        }

        [HttpGet]
        [Authorize]
        public string GetVoteSelectedOption(string resolutionId)
        {
            Vote vote = GetVote(resolutionId);

            if (vote != null)
            {
                int EnumValue = Int32.Parse(vote.ChosenOption);
                Enum.GetName(typeof(VoteChosenOption), EnumValue);
                return EnumValue.ToString();
            }
            else
            {
                return "0";
            }
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
            else if (!CheckIfAlreadyVotedForResolution(resolutionId))
            {
                string userId = _context.GetUserByEmail(GetUserEmailFromRequest()).Id;

                Vote newVote = new Vote
                {
                    UserId = userId,
                    ResolutionId = resolutionId,

                    DateOfVoting = DateTime.Now,
                    ChosenOption = chosenOption
                };

                _context.AddVote(newVote);

                return Ok();
            }
            return BadRequest();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult<Vote> VoteForResolutionAsAdmin(string resolutionId, string userId, string chosenOption)
        {
            int EnumValue = Int32.Parse(chosenOption);

            if (Enum.GetName(typeof(VoteChosenOption), EnumValue) == Enum.GetName(typeof(VoteChosenOption), 0))
            {
                return BadRequest();
            }
            else if (!CheckIfAlreadyAdminVotedForResolution(resolutionId, userId))
            {
                Vote newVote = new Vote
                {
                    UserId = userId,
                    ResolutionId = resolutionId,

                    DateOfVoting = DateTime.Now,
                    ChosenOption = chosenOption
                };

                _context.AddVote(newVote);

                return Ok();
            }
            return BadRequest();
        }


        [HttpGet]
        [Authorize]
        public VoteStatisticsViewModel GetVoteOnResolutionStatistics(string resolutionId)
        {
            VoteStatisticsViewModel voteStatisticsViewModel = new VoteStatisticsViewModel
            {
                VoteQuantity = _context.GetVotesQuantity(resolutionId),
                ArrayWithStatistics = _context.GetQuantityOfConcreteOptions(resolutionId)
            };
            voteStatisticsViewModel.NoVoteQuantity = _context.GetNoVotesQuantity(voteStatisticsViewModel.VoteQuantity);
            voteStatisticsViewModel.UsersData = _context.GetUsersWithLackOfVoteBasicCredentials(resolutionId);

            return voteStatisticsViewModel;
        }

        [HttpGet]
        [Authorize]
        public VoteStatisticsViewModel GetVoteOnResolutionStatisticsPercentage(string resolutionId)
        {
            VoteStatisticsViewModel voteStatisticsViewModel = new VoteStatisticsViewModel
            {
                VoteQuantity = _context.GetVotesQuantity(resolutionId),
                ArrayWithStatistics = _context.GetPercentageQuantityOfConcreteOptions(resolutionId)
            };
            voteStatisticsViewModel.NoVoteQuantity = _context.GetNoVotesQuantity(voteStatisticsViewModel.VoteQuantity);

            return voteStatisticsViewModel;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public List<DisplayUserCredentials> GetUsersCredentialsWithoutVote(string resolutionId)
        {
            List<DisplayUserCredentials> UsersWithoutVote = _context.GetUsersWithLackOfVoteBasicCredentials(resolutionId);

            return UsersWithoutVote;
        }
    }
}
