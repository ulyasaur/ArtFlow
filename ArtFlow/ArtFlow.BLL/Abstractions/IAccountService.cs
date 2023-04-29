using ArtFlow.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.BLL.Abstractions
{
    public interface IAccountService
    {
        Task<string> LoginAsync(string username, string password);

        Task<bool> RegistrateAsync(User user, string role, string password);
    }
}
