using ArtFlow.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.BLL.Validator
{
    public class ExhibitionValidator : IValidator<Exhibition>
    {
        public bool Validate(Exhibition entity)
        {
            return !string.IsNullOrWhiteSpace(entity.Name)
                && !string.IsNullOrEmpty(entity.Description)
                && !string.IsNullOrEmpty(entity.Adress)
                && entity.StartDate <= entity.EndDate;
        }
    }
}
