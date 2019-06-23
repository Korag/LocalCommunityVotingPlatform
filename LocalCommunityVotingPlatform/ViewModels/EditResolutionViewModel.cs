﻿using System;
using System.ComponentModel.DataAnnotations;

namespace LocalCommunityVotingPlatform.ViewModels
{
    public class EditResolutionViewModel
    {
        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        [Display(Name = "Identyfikator")]
        public string ResolutionId { get; set; }

        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        [Display(Name = "Tytuł")]
        [StringLength(250, MinimumLength = 3, ErrorMessage = "Pole \"{0}\" powinno zawierać minimum 3 znaki")]
        [DataType(DataType.Text)]
        public string Title { get; set; }

        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        [Display(Name = "Opis")]
        [StringLength(1500, MinimumLength = 3, ErrorMessage = "Pole \"{0}\" powinno zawierać minimum 3 znaki")]
        [DataType(DataType.Text)]
        public string Description { get; set; }

        [Display(Name = "Ważna do")]
        [Required(ErrorMessage = "Pole \"{0}\" jest wymagane")]
        public DateTime ActiveToVoteBeforeDate { get; set; }
    }
}
