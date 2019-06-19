using System.ComponentModel.DataAnnotations;

namespace LocalCommunityVotingPlatform.ViewModels
{
    public class UserViewModel
    {
        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        [Display(Name = "Adres email")]
        [EmailAddress(ErrorMessage = "Pole \"{0}\" nie zawiera poprawnie wprowadzonego adresu")]
        public string Email { get; set; }

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
        [Display(Name = "Rola użytkownika")]
        public string Role { get; set; }

        public string Edit { get; set; }
        public string Delete { get; set; }
    }
}
