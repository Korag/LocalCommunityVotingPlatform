using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using LocalCommunityVotingPlatform.ViewModels;
using LocalCommunityVotingPlatform.Models;
using System.Linq;
using LocalCommunityVotingPlatform.DAL;
using System.Security.Claims;

namespace LocalCommunityVotingPlatform.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private IDbOperations _context;

        public UserController(UserManager<User> userManager, IDbOperations context)
        {
            _context = context;
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
            if (ModelState.IsValid)
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

            else
            {
                ModelState.AddModelError("Overall", "Niepoprawnie wprowadzone dane użytkownika");
                return BadRequest(ModelState);
            }
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

        [HttpGet]
        [Authorize]
        public UserViewModel GetUserData()
        {
            string UserEmail = GetUserEmailFromRequest();

            var UserData = GetUserByEmail(UserEmail);

            return UserData;
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

        [HttpPost]
        [Authorize]
        public ActionResult ChangeUserPassword(ChangePasswordViewModel passwordModel)
        {
            if (ModelState.IsValid)
            {
                var CurrentUser = _userManager.Users.Where(z => z.Email == passwordModel.Email).FirstOrDefault();
                //PasswordVerificationResult passwordResult = _userManager.PasswordHasher.VerifyHashedPassword(CurrentUser, CurrentUser.PasswordHash, passwordModel.OldPassword);

                //if (CurrentUser.Email == passwordModel.Email && passwordResult == PasswordVerificationResult.Success)
                //{

                //}

                var result = _userManager.ChangePasswordAsync(CurrentUser, passwordModel.OldPassword, passwordModel.NewPassword);
                result.Wait();

                if (result.IsCompletedSuccessfully)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                ModelState.AddModelError("Overall", "Niepoprawnie wprowadzone hasła");
                return BadRequest(ModelState);
            }
        }
    }
}
