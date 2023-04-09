namespace ArtFlow.ViewModels
{
    public class ExhibitionUpdateViewModel
    {
        public int ExhibitionId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string OrganiserId { get; set; }

        public DateTimeOffset StartDate { get; set; }

        public DateTimeOffset EndDate { get; set; }

        public string Adress { get; set; }
    }
}
