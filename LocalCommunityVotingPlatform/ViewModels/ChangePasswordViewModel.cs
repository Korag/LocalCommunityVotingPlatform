using System.ComponentModel.DataAnnotations;

namespace LocalCommunityVotingPlatform.ViewModels
{
    public class ChangePasswordViewModel
    {
        [EmailAddress(ErrorMessage = "Pole \"{0}\" nie zawiera poprawnie wprowadzonego adresu email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        [Display(Name = "Stare hasło")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$", ErrorMessage = "Pole \"{0}\" nie może być krótsze niż 6 znaków, musi zawierać conajmniej: 1 dużą literę, 1 małą literę, 1 cyfrę oraz 1 znak specjalny (np.: !@#$%^&*)")]
        [DataType(DataType.Password)]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        [Display(Name = "Nowe hasło")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$", ErrorMessage = "Pole \"{0}\" nie może być krótsze niż 6 znaków, musi zawierać conajmniej: 1 dużą literę, 1 małą literę, 1 cyfrę oraz 1 znak specjalny (np.: !@#$%^&*)")]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        [Display(Name = "Powtórz nowe hasło")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$", ErrorMessage = "Pole \"{0}\" nie może być krótsze niż 6 znaków, musi zawierać conajmniej: 1 dużą literę, 1 małą literę, 1 cyfrę oraz 1 znak specjalny (np.: !@#$%^&*)")]
        [DataType(DataType.Password)]
        [Compare("NewPassword", ErrorMessage = "Wprowadzone nowe hasła różnią się - \"Nowe hasło\" i \"Powtórz nowe hasło\"")]
        public string ConfirmPassword { get; set; }
    }
}
