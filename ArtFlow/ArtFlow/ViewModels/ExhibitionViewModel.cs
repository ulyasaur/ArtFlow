using ArtFlow.Core.Entities;

namespace ArtFlow.ViewModels
{
    public class ExhibitionViewModel
    {
        public int ExhibitionId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string OrganiserId { get; set; }

        public UserViewModel Organiser { get; set; }

        public DateTimeOffset StartDate { get; set; }

        public DateTimeOffset EndDate { get; set; }

        public string Adress { get; set; }

        public List<RoomViewModel> Rooms { get; set; } 
    }
}
