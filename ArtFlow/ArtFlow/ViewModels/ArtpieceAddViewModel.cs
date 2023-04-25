namespace ArtFlow.ViewModels
{
    public class ArtpieceAddViewModel
    {
        public IFormFile Photo { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string AuthorName { get; set; }

        public double MinTemperature { get; set; }

        public double MaxTemperature { get; set; }

        public double MinHumidity { get; set; }

        public double MaxHumidity { get; set; }

        public double MinLight { get; set; }

        public double MaxLight { get; set; }
    }
}
