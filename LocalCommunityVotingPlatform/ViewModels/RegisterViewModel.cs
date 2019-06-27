using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LocalCommunityVotingPlatform.ViewModels
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        [Display(Name = "Adres email")]
        [EmailAddress(ErrorMessage = "Pole \"{0}\" nie zawiera poprawnie wprowadzonego adresu")]
        public string Email { get; set; }

        //[Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        //[Display(Name = "Hasło")]
        //[MinLength(8, ErrorMessage = "Hasło nie może być krótsze niż 8 znaków")]
        //public string Password { get; set; }

        //[Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        //[Display(Name = "Potwierdź hasło")]
        //[Compare("Password", ErrorMessage = "Wprowadzone hasła różnią się.")]
        //public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        [Display(Name = "Imię")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Pole \"{0}\" powinno zawierać od 3 do 100 znaków.")]
        [DataType(DataType.Text)]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        [Display(Name = "Nazwisko")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Pole \"{0}\" powinno zawierać od 3 do 100 znaków.")]
        [DataType(DataType.Text)]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        [Display(Name = "Adres zamieszkania")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Pole \"{0}\" powinno zawierać od 3 do 100 znaków.")]
        [DataType(DataType.Text)]
        public string Address { get; set; }

        public ICollection<string> AvailableRoles { get; set; }

        [Display(Name = "Rola użytkownika")]
        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        public string SelectedRole { get; set; }
    }
}
