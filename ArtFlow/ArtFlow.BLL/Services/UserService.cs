using ArtFlow.BLL.Abstractions;
using ArtFlow.BLL.Validator;
using ArtFlow.BLL.Validators;
using ArtFlow.Core.Entities;
using ArtFlow.DAL.Abstractions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IBaseRepository<User> _userRepository;
        private readonly UserManager<User> _userManager;
        private readonly IValidator<User> _userValidator;
        private readonly ILogger<UserService> _logger;

        public UserService(IBaseRepository<User> userRepository, 
            UserManager<User> userManager,
            ILogger<UserService> logger)
        {
            _userRepository = userRepository;
            _userManager = userManager;
            _userValidator = new UserValidator();
            _logger = logger;
        }

        public async Task DeleteUserAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentNullException("User id must not be null");
            }

            try
            {
                User user = await _userRepository.FindByIdAsync(userId);

                this._userRepository.Remove(user);
                await this._userRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<User> GetUserByIdAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentNullException("User id must not be null");
            }

            try
            {
                User user = await _userRepository
                    .GetAll()
                    .Include(e => e.Exhibitions)
                    .Include(a => a.Artpieces)
                    .Include(s => s.SellOrders)
                    .Include(d => d.DeliveryOrders)
                    .Include(d => d.DriveOrders)
                    .Include(p => p.Photo)
                    .FirstOrDefaultAsync(u => u.Id.Equals(userId));
                return user;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }
        public async Task<User> GetUserByEmailAsync(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                throw new ArgumentNullException("Email must not be null");
            }

            try
            {
                User user = await _userRepository
                    .GetAll()
                    .Include(e => e.Exhibitions)
                    .Include(a => a.Artpieces)
                    .Include(s => s.SellOrders)
                    .Include(d => d.DeliveryOrders)
                    .Include(d => d.DriveOrders)
                    .Include(p => p.Photo)
                    .FirstOrDefaultAsync(u => u.Email.Equals(email));
                return user;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task UpdateUserAsync(User user)
        {
            if (string.IsNullOrEmpty(user.Id))
            {
                throw new ArgumentNullException("User id must not be null");
            }

            if(!this._userValidator.Validate(user))
            {
                throw new ArgumentException("User is not valid");
            }

            try
            {
                User existingUser = await _userRepository
                    .GetAll()
                    .AsNoTracking()
                    .FirstOrDefaultAsync(u => u.Id.Equals(user.Id));

                existingUser.FirstName = user.FirstName;
                existingUser.LastName = user.LastName;

                this._userRepository .Update(existingUser);
                await this._userRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                throw new ArgumentNullException("Username must not be null");
            }

            try
            {
                User user = await _userRepository
                    .GetAll()
                    .Include(e => e.Exhibitions)
                    .Include(a => a.Artpieces)
                    .Include(s => s.SellOrders)
                    .Include(d => d.DeliveryOrders)
                    .Include(d => d.DriveOrders)
                    .Include(p => p.Photo)
                    .FirstOrDefaultAsync(u => u.UserName.Equals(username));
                return user;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<string> GetUserRoleAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentNullException("User id must not be null");
            }

            try
            {
                User user = await _userRepository
                    .GetAll()
                    .FirstOrDefaultAsync(u => u.Id.Equals(userId));

                string role = (await this._userManager.GetRolesAsync(user)).FirstOrDefault();

                return role;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }
    }
}
