using ArtFlow.Core.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.Core.Entities
{
    public class State : IBaseEntity
    {
        public int StateId { get; set; }

        public double Temperature { get; set; }

        public double Humidity { get; set; }

        public double Light { get; set; }

        public DateTimeOffset CheckedOn { get; set; } = DateTimeOffset.Now;

        public int OrderId { get; set; }

        public Order Order { get; set; }
    }
}
