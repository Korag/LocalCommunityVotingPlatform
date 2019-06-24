using System.ComponentModel.DataAnnotations;

namespace LocalCommunityVotingPlatform.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        [Display(Name = "Adres email")]
        [EmailAddress(ErrorMessage = "Pole \"{0}\" nie zawiera poprawnie wprowadzonego adresu")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$", ErrorMessage = "Pole \"{0}\" nie może być krótsze niż 6 znaków, musi zawierać conajmniej: 1 dużą literę, 1 małą literę, 1 cyfrę oraz 1 znak specjalny (np.: !@#$%^&*)")]
        [DataType(DataType.Password)]
        [Display(Name = "Hasło")]
        public string Password { get; set; }
    }
}
