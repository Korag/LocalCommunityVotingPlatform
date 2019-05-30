using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LocalCommunityVotingPlatform.ViewModels
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Pole \"Adres email \" jest wymagane")]
        [EmailAddress(ErrorMessage = "Pole \"Adres email \" nie zawiera poprawnie wprowadzonego adresu")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Pole \"Hasło\" jest wymagane")]
        [MinLength(8, ErrorMessage = "Hasło nie może być krótsze niż 8 znaków")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Pole \"Potwierdź hasło\" jest wymagane")]
        [Compare("Password", ErrorMessage = "Wprowadzone hasła różnią się.")]
        public string ConfirmPassword { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Imię powinno zawierać od 3 do 100 znaków.")]
        [DataType(DataType.Text)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Pole \"Nazwisko\" powinno zawierać od 3 do 100 znaków.")]
        [DataType(DataType.Text)]
        public string LastName { get; set; }

        public ICollection<string> AvailableRoles { get; set; }

        [Required]
        public string SelectedRole { get; set; }
    }
}
