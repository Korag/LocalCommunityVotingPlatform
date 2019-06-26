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
            var Month = DateTime.UtcNow.Month.ToString();
            var Year = DateTime.UtcNow.Year.ToString();

            var Quantity = _context.GetResolutionsCountByMonth((Int32.Parse(Month)));
            Quantity++;

            if (Month.Length == 1)
            {
                Month = "0" + Month;
            }

            string QuantityString = "";

            if (Quantity < 10)
            {
                QuantityString = "0" + Quantity.ToString();
            }
            else
            {
                QuantityString = Quantity.ToString();
            }

            string Indexer = $"{QuantityString}/{Month}/{Year}";

            return Indexer;
        }
    }
}
