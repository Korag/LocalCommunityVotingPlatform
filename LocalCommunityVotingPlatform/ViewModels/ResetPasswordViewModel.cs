using System.ComponentModel.DataAnnotations;

namespace LocalCommunityVotingPlatform.ViewModels
{
    public class ResetPasswordViewModel
    {
        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        [Display(Name = "Adres email")]
        [EmailAddress(ErrorMessage = "Pole \"{0}\" nie zawiera poprawnie wprowadzonego adresu")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        [DataType(DataType.Password)]
        [Display(Name = "Kod wysłany na adres email")]
        public string Code { get; set; }

        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        [DataType(DataType.Password)]
        [Compare("Code", ErrorMessage = "Wprowadzone kod nie jest właściwy")]
        [Display(Name = "Oczekiwany kod")]
        public string ExpectedCode { get; set; }

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
        public string ConfirmNewPassword { get; set; }
    }
}
