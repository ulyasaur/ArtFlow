using ArtFlow.BLL.Validator;
using ArtFlow.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.BLL.Validators
{
    public class UserValidator : IValidator<User>
    {
        public bool Validate(User entity)
        {
            return !string.IsNullOrEmpty(entity.FirstName)
                && !string.IsNullOrEmpty(entity.LastName);
        }
    }
}
