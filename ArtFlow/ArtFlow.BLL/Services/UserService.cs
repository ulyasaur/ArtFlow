using ArtFlow.BLL.Abstractions;
using ArtFlow.BLL.Validator;
using ArtFlow.BLL.Validators;
using ArtFlow.Core.Entities;
using ArtFlow.DAL.Abstractions;
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
        private readonly IValidator<User> _userValidator;
        private readonly ILogger<UserService> _logger;

        public UserService(IBaseRepository<User> userRepository, 
            ILogger<UserService> logger)
        {
            _userRepository = userRepository;
            _userValidator = new UserValidator();
            _logger = logger;
        }

        public async Task DeleteUserAsyncAsync(string userId)
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
                    .FirstOrDefaultAsync(u => u.Id.Equals(userId));
                return user;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task UpdateUserAsyncAsync(User user)
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
    }
}
