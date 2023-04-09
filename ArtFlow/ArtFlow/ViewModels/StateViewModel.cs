namespace ArtFlow.ViewModels
{
    public class StateViewModel
    {
        public int StateId { get; set; }

        public double Temperature { get; set; }

        public double Humidity { get; set; }

        public double Light { get; set; }

        public DateTimeOffset CheckedOn { get; set; } 

        public int OrderId { get; set; }
    }
}
