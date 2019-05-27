using LocalCommunityVotingPlatform.DAL;
using LocalCommunityVotingPlatform.Models;
using LocalCommunityVotingPlatform.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

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
        public IActionResult EditUser(UserViewModel UpdatedUser)
        {
            User LegacyUser = _context.GetUserByEmail(UpdatedUser.Email);

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
        public ActionResult<User> DeleteUser(string email)
        {
            User User = _context.GetUserByEmail(email);
            _userManager.DeleteAsync(User);
            _context.SaveChanges();

            return Ok();
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public UserViewModel GetUserByEmail(string email)
        {
            User User = _context.GetUserByEmail(email);
            var UserRoles = _userManager.GetRolesAsync(User).Result;

            UserViewModel userViewModel = new UserViewModel
            {
                Email = User.Email,
                FirstName = User.FirstName,
                LastName = User.LastName,
                Role = UserRoles.FirstOrDefault()
            };

            return userViewModel;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult<Resolution> AddResolution(AddResolutionViewModel newResolution)
        {
            if (ModelState.IsValid)
            {
                var Resolution = new Resolution
                {
                    Id = Guid.NewGuid().ToString(),
                    Date = DateTime.UtcNow.Date,
                    Indexer = "",

                    Title = newResolution.Title,
                    Description = newResolution.Description,
                    ActiveToVoteBeforeDate = newResolution.ActiveToVoteBeforeDate
                };

                _context.AddResolution(Resolution);

                return Ok();
            }

            return BadRequest(newResolution);
        }


        [HttpGet]
        [Authorize(Roles = "Admin")]
        public ICollection<DisplayResolutionViewModel> GetResolutions()
        {
            var Resolutions = _context.GetResolutions();

            ICollection<DisplayResolutionViewModel> resolutionsViewModel = new List<DisplayResolutionViewModel>();

            foreach (var resolution in Resolutions)
            {
                DisplayResolutionViewModel singleResolutionViewModel = new DisplayResolutionViewModel
                {
                    Id = resolution.Id,
                    Date = resolution.Date,
                    Indexer = resolution.Indexer,
                    
                    Title = resolution.Title,
                    Description = resolution.Description,
                    ActiveToVoteBeforeDate = resolution.ActiveToVoteBeforeDate
                };

                resolutionsViewModel.Add(singleResolutionViewModel);
            }

            return resolutionsViewModel;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult EditResolution(DisplayResolutionViewModel UpdatedResolution)
        {
            Resolution LegacyResolution = _context.GetResolutionById(UpdatedResolution.Id);

            LegacyResolution.Title = UpdatedResolution.Title;
            LegacyResolution.Description = UpdatedResolution.Description;
            LegacyResolution.ActiveToVoteBeforeDate = UpdatedResolution.ActiveToVoteBeforeDate;

            LegacyResolution.Date = DateTime.UtcNow.Date;

            _context.SaveChanges();

            return Ok();
        }
    }
}