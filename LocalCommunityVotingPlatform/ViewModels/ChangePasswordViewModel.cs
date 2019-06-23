using System.ComponentModel.DataAnnotations;

namespace LocalCommunityVotingPlatform.ViewModels
{
    public class ChangePasswordViewModel
    {
        [EmailAddress(ErrorMessage = "Pole \"{0}\" nie zawiera poprawnie wprowadzonego adresu email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        [Display(Name = "Stare hasło")]
        [MinLength(8, ErrorMessage = "Stare hasło nie może być krótsze niż 8 znaków")]
        [DataType(DataType.Password)]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        [Display(Name = "Nowe hasło")]
        [MinLength(8, ErrorMessage = "Nowe hasło nie może być krótsze niż 8 znaków")]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        [Display(Name = "Powtórz nowe hasło")]
        [MinLength(8, ErrorMessage = "Pole \"{0}\" nie może być krótsze niż 8 znaków")]
        [DataType(DataType.Password)]
        [Compare("NewPassword", ErrorMessage = "Wprowadzone nowe hasła różnią się - \"Nowe hasło\" i \"Powtórz nowe hasło\"")]
        public string ConfirmPassword { get; set; }
    }
}
