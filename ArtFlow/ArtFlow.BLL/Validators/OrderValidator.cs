using ArtFlow.BLL.Validator;
using ArtFlow.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.BLL.Validators
{
    public class OrderValidator : IValidator<Order>
    {
        public bool Validate(Order entity)
        {
            return !string.IsNullOrEmpty(entity.Adress)
                && entity.ExhibitionId > 0
                && entity.ArtpieceId > 0;
        }
    }
}
