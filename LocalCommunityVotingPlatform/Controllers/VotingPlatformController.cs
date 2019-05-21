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
        [Authorize(Roles = "Admin")]
        public ICollection<UserViewModel> GetUsers()
        {
            var Users = _context.GetUsers();

            ICollection<UserViewModel> usersView = new List<UserViewModel>();

            foreach (var user in Users)
            {
                var UserRoles = _userManager.GetRolesAsync(user).Result;

                UserViewModel singleUserView = new UserViewModel
                {
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Role = UserRoles.FirstOrDefault()
                };

                usersView.Add(singleUserView);
            }

            return usersView;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult<User> EditUser(UserViewModel UpdatedUser)
        {
            User LegacyUser = _context.GetUserById(UpdatedUser.Id);

            LegacyUser.FirstName = UpdatedUser.FirstName;
            LegacyUser.LastName = UpdatedUser.LastName;
            LegacyUser.Email = UpdatedUser.Email;

            var Roles = _userManager.GetRolesAsync(LegacyUser).Result;
            _userManager.RemoveFromRoleAsync(LegacyUser, Roles.FirstOrDefault());
            _userManager.AddToRoleAsync(LegacyUser, UpdatedUser.Role);

            _context.SaveChanges();

            return Ok();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult<User> DeleteUser(string id)
        {
            User User = _context.GetUserById(id);
            _userManager.DeleteAsync(User);
            _context.SaveChanges();

            return Ok();
        }
    }
}