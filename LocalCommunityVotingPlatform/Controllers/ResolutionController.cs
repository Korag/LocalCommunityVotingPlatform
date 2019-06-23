using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using LocalCommunityVotingPlatform.ViewModels;
using LocalCommunityVotingPlatform.Models;
using System.Linq;
using LocalCommunityVotingPlatform.DAL;
using Microsoft.AspNetCore.Authorization;
using System;
using LocalCommunityVotingPlatform.Services;

namespace LocalCommunityVotingPlatform.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ResolutionController : ControllerBase
    {
        private IDbOperations _context;
        private IndexerGenerator _indexer;

        public ResolutionController(IDbOperations context)
        {
            _context = context;
            _indexer = new IndexerGenerator();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult<Resolution> AddResolution(AddResolutionViewModel newResolution)
        {
            if (ModelState.IsValid)
            {
                var Resolution = new Resolution
                {
                    Id = Guid.NewGuid().ToString(),
                    Date = DateTime.UtcNow.Date,
                    Indexer = _indexer.GenerateIndexer(),

                    Title = newResolution.Title,
                    Description = newResolution.Description,
                    ActiveToVoteBeforeDate = newResolution.ActiveToVoteBeforeDate
                };

                _context.AddResolution(Resolution);
                _context.SaveChanges();

                return Ok();
            }
            ModelState.AddModelError("Overall", "Niepoprawnie wprowadzone dane uchwały");

            return BadRequest(ModelState);
        }

        [HttpGet]
        [Authorize]
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

            ICollection<DisplayResolutionViewModel> orderedResolutionsViewModel = resolutionsViewModel.OrderByDescending(z => z.Indexer).ToList();

            return orderedResolutionsViewModel;
        }

        [HttpGet]
        [Authorize]
        public ICollection<DisplayResolutionViewModel> GetActiveResolutions()
        {
            var Resolutions = _context.GetActiveResolutions();

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

            ICollection<DisplayResolutionViewModel> orderedResolutionsViewModel = resolutionsViewModel.OrderByDescending(z => z.Indexer).ToList();

            return orderedResolutionsViewModel;
        }

        [HttpGet]
        [Authorize]
        public ICollection<DisplayResolutionViewModel> GetArchiveResolutions()
        {
            var Resolutions = _context.GetArchiveResolutions();

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

            ICollection<DisplayResolutionViewModel> orderedResolutionsViewModel = resolutionsViewModel.OrderByDescending(z => z.Indexer).ToList();

            return orderedResolutionsViewModel;
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

        [HttpGet]
        [Authorize]
        public DisplayResolutionViewModel GetResolutionById(string resolutionId)
        {
            Resolution resolution = _context.GetResolutionById(resolutionId);

            DisplayResolutionViewModel resolutionViewModel = new DisplayResolutionViewModel
            {
                Indexer = resolution.Indexer,
                Title = resolution.Title,
                Description = resolution.Description,
                ActiveToVoteBeforeDate = resolution.ActiveToVoteBeforeDate
            };

            return resolutionViewModel;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult<Resolution> DeleteResolution(string resolutionId)
        {
            _context.RemoveResolution(resolutionId);
            _context.SaveChanges();

            return Ok();
        }
    }
}
