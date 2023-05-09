﻿using ArtFlow.BLL.Abstractions;
using ArtFlow.Core.Entities;
using ArtFlow.Services.Abstractions;
using ArtFlow.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArtFlow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        private readonly IUserService _userService;

        private readonly IUserAccessor _userAccessor;

        private readonly IMapper _mapper;

        public AccountController(
            IAccountService accountService,
            IUserService userService,
            IUserAccessor userAccessor,
            IMapper mapper)
        {
            _accountService = accountService;
            _userService = userService;
            _userAccessor = userAccessor;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginViewModel user)
        {
            try
            {
                var token = await _accountService.LoginAsync(user.Email, user.Password);

                User userInfo = await this._userService.GetUserByEmailAsync(user.Email);

                AuthResponseViewModel authResponse = new AuthResponseViewModel();
                authResponse.Token = token.Replace("\"", string.Empty);
                authResponse.User = new UserViewModel();
                this._mapper.Map(userInfo, authResponse.User);

                return Ok(authResponse);
            }
            catch (InvalidOperationException ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            try
            {
                User user = new User();

                this._mapper.Map(model, user);

                if (await _accountService.RegistrateAsync(user, model.Role, model.Password))
                {
                    return Ok();
                }

                return BadRequest("User with such email or username already exists");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("current")]
        public async Task<IActionResult> GetCurrentUser()
        {
            try
            {
                string userId = this._userAccessor.GetUserId();

                User user = await this._userService.GetUserByIdAsync(userId);

                UserViewModel userViewModel = new UserViewModel();

                this._mapper.Map(user, userViewModel);

                userViewModel.Role = await this._userService.GetUserRoleAsync(userId);

                return Ok(userViewModel);
            }
            catch (Exception ex)
            {
                return BadRequest("Cannot get current user");
            }
        }
    }
}
