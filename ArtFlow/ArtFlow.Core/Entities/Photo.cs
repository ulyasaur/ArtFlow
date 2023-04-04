using ArtFlow.Core.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.Core.Entities
{
    public class Photo : IBaseEntity
    {
        public string PhotoId { get; set; }

        public string Url { get; set; }
    }
}
