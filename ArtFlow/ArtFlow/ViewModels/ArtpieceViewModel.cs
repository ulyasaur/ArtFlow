using ArtFlow.Core.Entities;

namespace ArtFlow.ViewModels
{
    public class ArtpieceViewModel
    {
        public string ArtpieceId { get; set; }

        public string PhotoId { get; set; }

        public PhotoViewModel Photo { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string AuthorName { get; set; }

        public string OwnerId { get; set; }

        public UserViewModel Owner { get; set; }

        public KeepRecommendationViewModel KeepRecommendation { get; set; }
    }
}
