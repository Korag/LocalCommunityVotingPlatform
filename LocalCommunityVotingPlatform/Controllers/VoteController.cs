using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using LocalCommunityVotingPlatform.ViewModels;
using LocalCommunityVotingPlatform.Models;
using System.Linq;
using LocalCommunityVotingPlatform.DAL;
using Microsoft.AspNetCore.Authorization;
using System;

namespace LocalCommunityVotingPlatform.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class VoteController : ControllerBase
    {
        private IDbOperations _context;

        public VoteController()
        {
            _context = new DbOperations();
        }

      
    }
}
