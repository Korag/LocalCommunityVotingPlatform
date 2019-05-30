using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using LocalCommunityVotingPlatform.ViewModels;
using LocalCommunityVotingPlatform.Models;
using System.Linq;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using LocalCommunityVotingPlatform.Services;

namespace LocalCommunityVotingPlatform.Controllers
{
    public enum AvailableRoles
    {
        Admin,
        User
    }

    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IEmailSender _emailSender;
        private readonly IConfiguration _configuration;

        public AccountController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _emailSender = new EmailProvider(_configuration);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody]LoginViewModel loginModel)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(loginModel.Email, loginModel.Password, isPersistent: false, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    var LoggedUser = _userManager.Users.SingleOrDefault(z => z.Email == loginModel.Email);
                    return Ok(await CreateJwtToken(LoggedUser));
                }
            }

            return BadRequest();
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public ICollection<string> GetAvailableRoles()
        {
            return Enum.GetValues(typeof(AvailableRoles)).Cast<AvailableRoles>().Select(v => v.ToString()).ToList();
        }

        [HttpGet]
        [Authorize]
        public bool Authorize()
        {
            bool SuperUser = User.IsInRole(AvailableRoles.Admin.ToString());

            return SuperUser;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Register(RegisterViewModel registeredUser)
        {
            if (ModelState.IsValid)
            {
                var newUser = new User
                {
                    UserName = registeredUser.Email,
                    Email = registeredUser.Email,
                    FirstName = registeredUser.FirstName,
                    LastName = registeredUser.LastName
                };
               
                var result = await _userManager.CreateAsync(newUser, registeredUser.Password);

                if (!await _roleManager.RoleExistsAsync(registeredUser.SelectedRole))
                {
                    await _roleManager.CreateAsync(new IdentityRole(registeredUser.SelectedRole));
                }

                var addToRole = await _userManager.AddToRoleAsync(newUser, registeredUser.SelectedRole);

                if (result.Succeeded)
                {
                    await _emailSender.SendEmail(newUser.Email, "Rejestracja LocalCommunityVotingApp",
                        $"Utworzono konto dla: {newUser.FirstName} {newUser.LastName}. <br />" +
                        $"<br />" + 
                        $"Twoje dane logowania: <br />" +
                        $"email: {newUser.Email} <br />" +
                        $"hasło: {registeredUser.Password} <br />" +
                        $"<br />" +
                        $"W celach bezpieczeństwa zmień swoje hasło zaraz po udanym logowaniu.");

                    return Ok();
                }
            }

            return BadRequest();
        }

        private async Task<string> CreateJwtToken(User loggedUser)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, loggedUser.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, loggedUser.Id)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["JwtExpireDays"]));

            var roles = await _userManager.GetRolesAsync(loggedUser);
            claims.AddRange(roles.Select(role => new Claim(ClaimsIdentity.DefaultRoleClaimType, role)));

            var token = new JwtSecurityToken(
                _configuration["JwtIssuer"],
                _configuration["JwtIssuer"],
                claims,
                expires: expires,
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
