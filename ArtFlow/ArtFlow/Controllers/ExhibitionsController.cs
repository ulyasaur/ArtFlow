using ArtFlow.BLL.Abstractions;
using ArtFlow.Core.Entities;
using ArtFlow.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArtFlow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExhibitionsController : ControllerBase
    {
        private readonly IExhibitionService _exhibitionService;
        private readonly IMapper _mapper;
        private readonly ILogger<ExhibitionsController> _logger;

        public ExhibitionsController(IExhibitionService exhibitionService, 
            IMapper mapper, 
            ILogger<ExhibitionsController> logger)
        {
            _exhibitionService = exhibitionService;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet("organiser/{userId}")]
        public async Task<IActionResult> GetUserExhibitionsAsync(string userId)
        {
            try
            {
                List<Exhibition> exhibitions = await this._exhibitionService.GetUserExhibitionsAsync(userId);
                
                List<ExhibitionViewModel> exhibitionViewModels = new List<ExhibitionViewModel>();
                this._mapper.Map(exhibitions, exhibitionViewModels);

                return Ok(exhibitionViewModels);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{exhibitionId}")]
        public async Task<IActionResult> GetExhibitionAsync(int exhibitionId)
        {
            try
            {
                Exhibition exhibition = await this._exhibitionService.GetExhibitionAsync(exhibitionId);

                ExhibitionViewModel exhibitionViewModel = new ExhibitionViewModel();
                this._mapper.Map(exhibition, exhibitionViewModel);

                return Ok(exhibitionViewModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddExhibitionAsync(ExhibitionUpdateViewModel exhibitionUpdateViewModel)
        {
            try
            {
                Exhibition exhibition = new Exhibition();
                this._mapper.Map(exhibitionUpdateViewModel, exhibition);

                await this._exhibitionService.AddExhibitionAsync(exhibition);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateExhibitionAsync(ExhibitionUpdateViewModel exhibitionUpdateViewModel)
        {
            try
            {
                Exhibition exhibition = new Exhibition();
                this._mapper.Map(exhibitionUpdateViewModel, exhibition);

                await this._exhibitionService.UpdateExhibitionAsync(exhibition);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteExhibitionAsync(int exhibitionId)
        {
            try
            {
                await this._exhibitionService.DeleteExhibitionAsync(exhibitionId);

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
