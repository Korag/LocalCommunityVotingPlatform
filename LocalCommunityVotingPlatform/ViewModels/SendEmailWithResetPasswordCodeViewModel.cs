using System.ComponentModel.DataAnnotations;

namespace LocalCommunityVotingPlatform.ViewModels
{
    public class SendEmailWithResetPasswordCodeViewModel
    {
        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        [Display(Name = "Adres email")]
        [EmailAddress(ErrorMessage = "Pole \"{0}\" nie zawiera poprawnie wprowadzonego adresu")]
        public string Email { get; set; }

        public string Code { get; set; }
        public string ExpectedCode { get; set; }
    }
}
