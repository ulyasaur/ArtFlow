﻿using ArtFlow.BLL.Abstractions;
using ArtFlow.Core.Entities;
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
    public class AccountService : IAccountService
    {
        private readonly ITokenService _tokenService;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ILogger<AccountService> _logger;

        public AccountService(
            ITokenService tokenService,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            RoleManager<IdentityRole> roleManager,
            ILogger<AccountService> logger)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _logger = logger;
        }

        public async Task<string> LoginAsync(string email, string password)
        {
            var logged = await _userManager.Users.FirstOrDefaultAsync(x => x.Email.Equals(email));

            if (logged is null)
            {
                throw new InvalidOperationException("User not found");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(logged, password, false);

            var roles = await _userManager.GetRolesAsync(logged);

            if (result.Succeeded)
            {
                return _tokenService.GenerateToken(logged, roles.ToList());
            }

            throw new InvalidOperationException("Incorrect password");
        }

        public async Task<bool> RegistrateAsync(User user, string role, string password)
        {
            if (await IsThereSuchEmailAsync(user.Email))
            {
                _logger.LogError("Validation exception user with such email already exists");
                return false;
            }

            if (await IsThereSuchLoginAsync(user.UserName))
            {
                _logger.LogError("Validation exception user with such username already exists");
                return false;
            }

            IdentityResult result;

            try
            {
                result = await _userManager.CreateAsync(user, password);
            }
            catch
            {
                _logger.LogError("Validation exception problems when creating a user");
                return false;
            }

            if (result.Succeeded)
            {
                var roles = await _roleManager.Roles.ToListAsync();
                var defaultRole = roles.Find(r => r.Name == role);

                if (defaultRole != null)
                {
                    var roleResult = await _userManager.AddToRoleAsync(user, defaultRole.Name);
                }
                return true;
            }
            else
            {
                _logger.LogError(result.ToString());
                return false;
            }

        }

        private async Task<bool> IsThereSuchLoginAsync(string login)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName.Equals(login));
        }

        private async Task<bool> IsThereSuchEmailAsync(string login)
        {
            return await _userManager.Users.AnyAsync(x => x.Email.Equals(login));
        }
    }
}
