using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using LocalCommunityVotingPlatform.ViewModels;
using LocalCommunityVotingPlatform.Models;
using System.Linq;
using LocalCommunityVotingPlatform.DAL;
using Microsoft.AspNetCore.Authorization;
using System;

namespace LocalCommunityVotingPlatform.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class ResolutionController : ControllerBase
    {
        private IDbOperations _context;

        public ResolutionController()
        {
            _context = new DbOperations();
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public ICollection<DisplayResolutionViewModel> GetResolutions()
        {
            var Resolutions = _context.GetResolutions();

            ICollection<DisplayResolutionViewModel> resolutionsViewModel = new List<DisplayResolutionViewModel>();

            foreach (var resolution in Resolutions)
            {
                DisplayResolutionViewModel singleResolutionViewModel = new DisplayResolutionViewModel
                {
                    Id = resolution.Id,
                    CreationDate = resolution.Date,
                    Indexer = resolution.Indexer,

                    Title = resolution.Title,
                    Description = resolution.Description,
                    ActiveToVoteBeforeDate = resolution.ActiveToVoteBeforeDate
                };

                resolutionsViewModel.Add(singleResolutionViewModel);
            }

            return resolutionsViewModel;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult EditResolution(DisplayResolutionViewModel UpdatedResolution)
        {
            Resolution LegacyResolution = _context.GetResolutionById(UpdatedResolution.Id);

            LegacyResolution.Title = UpdatedResolution.Title;
            LegacyResolution.Description = UpdatedResolution.Description;
            LegacyResolution.ActiveToVoteBeforeDate = UpdatedResolution.ActiveToVoteBeforeDate;

            LegacyResolution.Date = DateTime.UtcNow.Date;

            _context.SaveChanges();

            return Ok();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult<Resolution> DeleteResolution(string resolutionId)
        {
            _context.RemoveResolution(resolutionId);

            return Ok();
        }
    }
}
