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
        public int ArtpieceId { get; set; }

        public string PhotoId { get; set; }

        public Photo Photo { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string AuthorId { get; set; }

        public User Author { get; set; }

        public int KeepRecommendationId { get; set; }

        public KeepRecommendation KeepRecommendation { get; set; }

        public List<RoomArtpiece> RoomArtpieces { get; set; }

        public List<ExhibitionArtpiece> ExhibitionArtpieces { get; set; }

        public List<Order> Orders { get; set; }
    }
}
