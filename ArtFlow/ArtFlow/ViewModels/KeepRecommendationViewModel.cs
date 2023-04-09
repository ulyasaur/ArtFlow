using ArtFlow.Core.Entities;

namespace ArtFlow.ViewModels
{
    public class KeepRecommendationViewModel
    {
        public int KeepRecommendationId { get; set; }

        public int ArtpieceId { get; set; }

        public double MinTemperature { get; set; }

        public double MaxTemperature { get; set; }

        public double MinHumidity { get; set; }

        public double MaxHumidity { get; set; }

        public double MinLight { get; set; }

        public double MaxLight { get; set; }
    }
}