using ArtFlow.Core.Entities;

namespace ArtFlow.ViewModels
{
    public class ArtpieceUpdateViewModel
    {
        public string ArtpieceId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string AuthorName { get; set; }

        public int KeepRecommendationId { get; set; }

        public double MinTemperature { get; set; }

        public double MaxTemperature { get; set; }

        public double MinHumidity { get; set; }

        public double MaxHumidity { get; set; }

        public double MinLight { get; set; }

        public double MaxLight { get; set; }
    }
}
