using ArtFlow.BLL.Validator;
using ArtFlow.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.BLL.Validators
{
    public class RoomValidator : IValidator<Room>
    {
        public bool Validate(Room entity)
        {
            return !string.IsNullOrEmpty(entity.Name)
                && entity.ExhibitionId > 0
                && entity.MaxNumberOfPieces > 0;
        }
    }
}
