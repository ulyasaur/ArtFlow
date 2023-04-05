using ArtFlow.Core.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.Core.Entities
{
    public class Room : IBaseEntity
    {
        public int RoomId { get; set; }

        public string Name { get; set; }

        public int EshibitionId { get; set; }

        public Exhibition Exhibition { get; set; }

        public int NumberOfPieces { get; set; }

        public List<RoomArtpiece> RoomArtpieces { get; set; }
    }
}
