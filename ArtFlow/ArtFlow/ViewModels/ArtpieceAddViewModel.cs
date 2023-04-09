namespace ArtFlow.ViewModels
{
    public class ArtpieceAddViewModel
    {
        public IFormFile Photo { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string AuthorName { get; set; }

        public KeepRecommendationViewModel KeepRecommendation { get; set; }
    }
}
