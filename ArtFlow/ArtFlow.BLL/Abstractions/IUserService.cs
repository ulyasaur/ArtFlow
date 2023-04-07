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

        Task UpdateUserAsyncAsync(User user);

        Task DeleteUserAsyncAsync(string userId);
    }
}
