using ArtFlow.Core.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.Core.Entities
{
    public class Exhibition : IBaseEntity
    {
        public int ExhibitionId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string OrganiserId { get; set; }

        public User Organiser { get; set; }

        public DateTimeOffset HostedOn { get; set; }

        public string Adress { get; set; }

        public List<ExhibitionArtpiece> ExhibitionArtpieces { get; set; } = new List<ExhibitionArtpiece>();

        public List<Order> Orders { get; set; } = new List<Order>();

        public List<Room> Rooms { get; set; } = new List<Room>();
    }
}
