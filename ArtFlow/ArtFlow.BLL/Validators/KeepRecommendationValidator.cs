using ArtFlow.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.BLL.Validator
{
    public class KeepRecommendationValidator : IValidator<KeepRecommendation>
    {
        public bool Validate(KeepRecommendation entity)
        {
            return entity.MinTemperature < entity.MaxTemperature
                && entity.MinHumidity < entity.MaxHumidity
                && entity.MinLight < entity.MinLight;
        }
    }
}
