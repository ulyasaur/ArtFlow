using ArtFlow.Core.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.Core.Entities
{
    public class RoomArtpiece : IBaseEntity
    {
        public int RoomId { get; set; }

        public Room Room { get; set; }

        public int ArtpieceId { get; set; }

        public Artpiece Artpiece { get; set; }
    }
}
