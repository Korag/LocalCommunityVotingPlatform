using System;
using System.ComponentModel.DataAnnotations;

namespace LocalCommunityVotingPlatform.ViewModels
{
    public class AddResolutionViewModel
    {
        [Required]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Pole \"Tytuł\" powinno zawierać minimum 3 znaki")]
        [DataType(DataType.Text)]
        public string Title { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Pole \"Opis\" powinno zawierać minimum 3 znaki")]
        [DataType(DataType.Text)]
        public string Description { get; set; }

        [Required]
        public DateTime ActiveToVoteBeforeDate { get; set; }
    }
}
