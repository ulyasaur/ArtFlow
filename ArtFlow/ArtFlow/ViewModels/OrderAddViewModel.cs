using ArtFlow.Core.Entities;
using ArtFlow.Core.Enums;

namespace ArtFlow.ViewModels
{
    public class OrderAddViewModel
    {
        public string SellerId { get; set; }

        public string CustomerId { get; set; }

        public string? DriverId { get; set; }

        public int ArtpieceId { get; set; }

        public int ExhibitionId { get; set; }

        public string Adress { get; set; }
    }
}
