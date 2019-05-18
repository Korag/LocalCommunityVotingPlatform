using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalCommunityVotingPlatform.ViewModels
{
    public class RegisterViewModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }


        public ICollection<string> AvailableRoles { get; set; }
        public string SelectedRole { get; set; }
    }
}
