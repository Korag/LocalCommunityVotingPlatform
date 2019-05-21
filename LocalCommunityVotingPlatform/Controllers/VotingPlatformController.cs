using LocalCommunityVotingPlatform.DAL;
using LocalCommunityVotingPlatform.Models;
using LocalCommunityVotingPlatform.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace LocalCommunityVotingPlatform.Controllers
{
    [Route("api/[action]")]
    [ApiController]
    public class VotingPlatformController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private IDbOperations _context;

        public VotingPlatformController(UserManager<User> userManager)
        {
            _context = new DbOperations();
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        public ICollection<UserViewModel> GetUsers()
        {
            var Users = _context.GetUsers();

            ICollection<UserViewModel> usersView = new List<UserViewModel>();

            foreach (var user in Users)
            {
                UserViewModel singleUserView = new UserViewModel
                {
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Role = "Rola"
                    //Role =  _userManager.FindByIdAsync(user.Id).Roles.RoleId
                };

                usersView.Add(singleUserView);
            }

            return usersView;
        }
    }
}