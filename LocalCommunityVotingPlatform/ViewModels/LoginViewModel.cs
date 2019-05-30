using System.ComponentModel.DataAnnotations;

namespace LocalCommunityVotingPlatform.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Pole \"Adres email \" jest wymagane")]
        [EmailAddress(ErrorMessage = "Pole \"Adres email \" nie zawiera poprawnie wprowadzonego adresu")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Pole \"Hasło\" jest wymagane")]
        [MinLength(8, ErrorMessage ="Hasło nie może być krótsze niż 8 znaków")]
        public string Password { get; set; }
    }
}
