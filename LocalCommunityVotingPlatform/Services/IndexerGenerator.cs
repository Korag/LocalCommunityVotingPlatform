using LocalCommunityVotingPlatform.DAL;
using System;

namespace LocalCommunityVotingPlatform.Services
{
    public class IndexerGenerator
    {
        private IDbOperations _context;

        public IndexerGenerator()
        {
            _context = new DbOperations();
        }

        public string GenerateIndexer()
        {
            var Month = DateTime.UtcNow.Month;
            var Year = DateTime.UtcNow.Year;

            var Quantity = _context.GetResolutionsCountByMonth(Month);

            string Indexer = $"{Quantity + 1}/{Month}/{Year}";

            return Indexer;
        }
    }
}
