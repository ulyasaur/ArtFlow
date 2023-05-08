using ArtFlow.Core.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.Core.Entities
{
    public class ExhibitionArtpiece : IBaseEntity
    {
        public int ExhibitionId { get; set; }

        public Exhibition Exhibition { get; set; }

        public string ArtPieceId { get; set; }

        public Artpiece Artpiece { get; set; }
    }
}
