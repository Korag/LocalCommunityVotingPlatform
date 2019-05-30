using System.ComponentModel.DataAnnotations;

namespace LocalCommunityVotingPlatform.ViewModels
{
    public class UserViewModel
    {
        [Required(ErrorMessage = "Pole \"Adres email \" jest wymagane")]
        [EmailAddress(ErrorMessage = "Pole \"Adres email \" nie zawiera poprawnie wprowadzonego adresu")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Imię powinno zawierać od 3 do 100 znaków.")]
        [DataType(DataType.Text)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Pole \"Nazwisko\" powinno zawierać od 3 do 100 znaków.")]
        [DataType(DataType.Text)]
        public string LastName { get; set; }

        [Required]
        public string Role { get; set; }

        public string Edit { get; set; }
        public string Delete { get; set; }
    }
}
