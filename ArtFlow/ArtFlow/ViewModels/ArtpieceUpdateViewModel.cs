using ArtFlow.Core.Entities;

namespace ArtFlow.ViewModels
{
    public class ArtpieceUpdateViewModel
    {
        public int ArtpieceId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string AuthorName { get; set; }

        public KeepRecommendationViewModel KeepRecommendation { get; set; }
    }
}
