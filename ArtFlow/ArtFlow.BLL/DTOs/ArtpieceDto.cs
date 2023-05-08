using ArtFlow.Core.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.BLL.DTOs
{
    public class ArtpieceDto
    {
        public string ArtpieceId { get; set; }

        public IFormFile Photo { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string AuthorName { get; set; }

        public string OwnerId { get; set; }

        public int KeepRecommendationId { get; set; }

        public double MinTemperature { get; set; }

        public double MaxTemperature { get; set; }

        public double MinHumidity { get; set; }

        public double MaxHumidity { get; set; }

        public double MinLight { get; set; }

        public double MaxLight { get; set; }
    }
}
