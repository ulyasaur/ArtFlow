using ArtFlow.Core.Entities;

namespace ArtFlow.ViewModels
{
    public class RoomViewModel
    {
        public int RoomId { get; set; }

        public string Name { get; set; }

        public int ExhibitionId { get; set; }

        public ExhibitionViewModel Exhibition { get; set; }

        public int NumberOfPieces { get; set; }

        public int MaxNumberOfPieces { get; set; }
    }
}
