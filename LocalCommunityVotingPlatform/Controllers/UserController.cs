using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using LocalCommunityVotingPlatform.ViewModels;
using LocalCommunityVotingPlatform.Models;
using System.Linq;
using LocalCommunityVotingPlatform.DAL;
using System.Security.Claims;
using LocalCommunityVotingPlatform.Services;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace LocalCommunityVotingPlatform.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private IDbOperations _context;
        private readonly IEmailSender _emailSender;
        private readonly IConfiguration _configuration;
        private readonly PasswordGenerator _passwordGenerator;

        public UserController(UserManager<User> userManager, IDbOperations context, IConfiguration configuration)
        {
            _context = context;
            _userManager = userManager;
            _passwordGenerator = new PasswordGenerator();

            _configuration = configuration;
            _emailSender = new EmailProvider(_configuration);
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

                if (singleUserView.Role == "User")
                {
                    singleUserView.Role = "Użytkownik";
                }
                else
                {
                    singleUserView.Role = "Administrator";
                }

                usersView.Add(singleUserView);
            }

            return usersView;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult EditUser(EditUserViewModel updatedUser)
        {
            if (ModelState.IsValid)
            {
                User LegacyUser = _context.GetUserByEmail(updatedUser.EmailBeforeEdit);

                LegacyUser.FirstName = updatedUser.FirstName;
                LegacyUser.LastName = updatedUser.LastName;
                LegacyUser.Email = updatedUser.Email;

                _context.SaveChanges();

                var role = _userManager.GetRolesAsync(LegacyUser).Result.FirstOrDefault();

                if (role != updatedUser.Role)
                {
                    _userManager.UpdateAsync(LegacyUser);
                    _context.SaveChanges();

                    _userManager.RemoveFromRoleAsync(LegacyUser, role).Wait();

                    _userManager.UpdateAsync(LegacyUser);
                    _context.SaveChanges();

                    _userManager.AddToRoleAsync(LegacyUser, updatedUser.Role).Wait();
                    _userManager.UpdateAsync(LegacyUser);
                    _context.SaveChanges();
                }

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

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetResetPasswordCode(SendEmailWithResetPasswordCodeViewModel resetPasswordMessage)
        {
            if (ModelState.IsValid)
            {
                if (GetUserByEmail(resetPasswordMessage.Email) != null)
                {
                    resetPasswordMessage.ExpectedCode = _userManager.GeneratePasswordResetTokenAsync(_userManager.Users.Where(z => z.Email == resetPasswordMessage.Email).FirstOrDefault()).Result;

                    await _emailSender.SendEmail(resetPasswordMessage.Email, "Resetowanie hasła LocalCommunityVotingApp",
                                $"Twój kod dla zresetowania hasła do konta o adresie: {resetPasswordMessage.Email}: <br />" +
                                $"<br />" +
                                $"{resetPasswordMessage.ExpectedCode}");

                    return Ok(resetPasswordMessage);
                }
                else
                {
                    ModelState.AddModelError("Overall", "Nie istnieje użytkownik systemu wykorzystujący wprowadzony adres email");
                    return BadRequest(ModelState);
                }
            }
            else
            {
                ModelState.AddModelError("Overall", "Błędny format adresu email");
                return BadRequest(ModelState);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult ResetUserPassword(ResetPasswordViewModel passwordModel)
        {
            if (ModelState.IsValid)
            {
                var User = _userManager.Users.Where(z => z.Email == passwordModel.Email).FirstOrDefault();

                var result = _userManager.ResetPasswordAsync(User, passwordModel.Code, passwordModel.NewPassword);
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
                ModelState.AddModelError("Overall", "Wprowadzony kod jest niepoprawny lub hasła nie zostały wprowadzonej we właściwej postaci");
                return BadRequest(ModelState);
            }
        }
    }
}
