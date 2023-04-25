using ArtFlow.BLL.Abstractions;
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
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;
        private readonly ILogger<UsersController> _logger;

        public UsersController(IUserService userService, 
            IUserAccessor userAccessor, 
            IMapper mapper, 
            ILogger<UsersController> logger)
        {
            _userService = userService;
            _userAccessor = userAccessor;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserById(string userId)
        {
            try
            {
                User user = await this._userService.GetUserByIdAsync(userId);

                UserViewModel profile = new UserViewModel();

                this._mapper.Map(user, profile);

                return Ok(profile);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> EditUser(UserUpdateViewModel userUpdateViewModel)
        {
            try
            {
                User user = new User();

                this._mapper.Map(userUpdateViewModel, user);

                user.Id = this._userAccessor.GetUserId();

                await this._userService.UpdateUserAsync(user);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            try
            {
                await _userService.DeleteUserAsync(userId);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }
    }
}
