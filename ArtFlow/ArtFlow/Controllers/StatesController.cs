using ArtFlow.BLL.Abstractions;
using ArtFlow.Core.Entities;
using ArtFlow.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArtFlow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatesController : ControllerBase
    {
        private readonly IStateService _stateService;
        private readonly IMapper _mapper;
        private readonly ILogger<StatesController> _logger;

        public StatesController(IStateService stateService, 
            IMapper mapper, 
            ILogger<StatesController> logger)
        {
            _stateService = stateService;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost] 
        public async Task<IActionResult> AddState(StateViewModel stateViewModel)
        {
            try
            {
                State state = new State();
                this._mapper.Map(stateViewModel, state);
                state.CheckedOn = DateTimeOffset.UtcNow;

                bool isValid = await this._stateService.AddStateAsync(state);

                return Ok(isValid);
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("latest/{orderId}/check")] 
        public async Task<IActionResult> CheckLatestState(int orderId)
        {
            try
            {
                bool isValid = await this._stateService.CheckLatestStateAsync(orderId);

                return Ok(isValid);
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }


        [Authorize]
        [HttpGet("{orderId}")] 
        public async Task<IActionResult> GetStatesForOrder(int orderId)
        {
            try
            {
                List<State> states = await this._stateService.GetStatesForOrderAsync(orderId);

                List<StateViewModel> stateViewModels = new List<StateViewModel>();
                this._mapper.Map(states, stateViewModels);

                return Ok(stateViewModels);
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("latest/{orderId}")] 
        public async Task<IActionResult> GetLatestState(int orderId)
        {
            try
            {
                State state = await this._stateService.GetLatestStateAsync(orderId);

                StateViewModel stateViewModel = new StateViewModel();
                this._mapper.Map(state, stateViewModel);

                return Ok(stateViewModel);
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }
    }
}
