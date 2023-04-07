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
                && !string.IsNullOrEmpty(entity.SellerId)
                && !string.IsNullOrEmpty(entity.CustomerId)
                && entity.ArtpieceId > 0;
        }
    }
}
