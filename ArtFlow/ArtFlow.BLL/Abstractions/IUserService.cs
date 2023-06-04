using ArtFlow.Core.Entities;
using Microsoft.AspNetCore.Http;
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

        Task<User> GetUserByUsernameAsync(string username);

        Task<User> GetUserByEmailAsync(string email);

        Task UpdateUserAsync(User user);

        Task<Photo> SetProfilePicture(string userId, IFormFile file);

        Task DeleteUserAsync(string userId);

        Task<string> GetUserRoleAsync(string userId);
    }
}
