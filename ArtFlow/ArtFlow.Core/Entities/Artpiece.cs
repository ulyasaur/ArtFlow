using ArtFlow.Core.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.Core.Entities
{
    public class Artpiece : IBaseEntity
    {
        public string ArtpieceId { get; set; }

        public string? PhotoId { get; set; }

        public Photo Photo { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public string AuthorName { get; set; }

        public string OwnerId { get; set; }

        public User Owner { get; set; }

        public KeepRecommendation KeepRecommendation { get; set; } 

        public List<RoomArtpiece> RoomArtpieces { get; set; } = new List<RoomArtpiece>();

        public List<ExhibitionArtpiece> ExhibitionArtpieces { get; set; } = new List<ExhibitionArtpiece>();

        public List<Order> Orders { get; set; } = new List<Order>();
    }
}
