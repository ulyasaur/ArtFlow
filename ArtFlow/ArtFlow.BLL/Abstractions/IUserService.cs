using ArtFlow.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.BLL.Abstractions
{
    public interface IUserService
    {
        Task<User> GetUserByIdAsync(string userId);

        Task<User> GetUserByEmailAsync(string email);

        Task UpdateUserAsync(User user);

        Task DeleteUserAsync(string userId);
    }
}
