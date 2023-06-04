using ArtFlow.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.BLL.Validator
{
    public class ArtpieceValidator : IValidator<Artpiece>
    {
        public bool Validate(Artpiece entity)
        {
            return !string.IsNullOrEmpty(entity.Name)
                && !string.IsNullOrEmpty(entity.AuthorName)
                && !string.IsNullOrEmpty(entity.OwnerId);
        }
    }
}
