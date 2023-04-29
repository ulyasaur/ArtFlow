using ArtFlow.Core.Entities;
using ArtFlow.Core.Enums;

namespace ArtFlow.ViewModels
{
    public class OrderViewModel
    {
        public int OrderId { get; set; }

        public UserViewModel Seller { get; set; }

        public UserViewModel Customer { get; set; }

        public UserViewModel? Driver { get; set; }

        public ArtpieceViewModel Artpiece { get; set; }

        public ExhibitionViewModel Exhibition { get; set; }

        public string Adress { get; set; }

        public DeliveryStatus Status { get; set; }

        public DateTimeOffset UpdatedOn { get; set; }

        public bool isStateOk { get; set; } = true;

        public StateViewModel? LatestState { get; set; }
    }
}
