using ArtFlow.BLL.Abstractions;
using ArtFlow.BLL.DTOs;
using ArtFlow.Core.Entities;
using ArtFlow.Services.Abstractions;
using ArtFlow.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArtFlow.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ArtpiecesController : ControllerBase
    {
        private readonly IArtpieceService _artpieceService;
        private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;
        private readonly ILogger<ArtpiecesController> _logger;

        public ArtpiecesController(IArtpieceService artpieceService, 
            IUserAccessor userAccessor, 
            IMapper mapper, 
            ILogger<ArtpiecesController> logger)
        {
            _artpieceService = artpieceService;
            _userAccessor = userAccessor;
            _mapper = mapper;
            _logger = logger;
        }

        [Authorize(Roles = "Organiser")]
        [HttpGet("available")]
        public async Task<IActionResult> GetAvailableArtpiecesAsync()
        {
            try
            {
                List<Artpiece> artpieces = await this._artpieceService.GetAvailableArtpiecesAsync();

                List<ArtpieceViewModel> artpieceViewModels = new List<ArtpieceViewModel>();
                this._mapper.Map(artpieces, artpieceViewModels);

                return Ok(artpieceViewModels);
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "ArtOwner")]
        [HttpGet("owner/{ownerId}")]
        public async Task<IActionResult> GetOwnerArtpiecesAsync(string ownerId)
        {
            try
            {
                List<Artpiece> artpieces = await this._artpieceService.GetOwnerArtpiecesAsync(ownerId);

                List<ArtpieceViewModel> artpieceViewModels = new List<ArtpieceViewModel>();
                this._mapper.Map(artpieces, artpieceViewModels);

                return Ok(artpieceViewModels);
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Organiser")]
        [HttpGet("exhibition/{exhibitionId}")]
        public async Task<IActionResult> GetExhibitionArtpiecesAsync(int exhibitionId)
        {
            try
            {
                List<Artpiece> artpieces = await this._artpieceService.GetExhibitionArtpiecesAsync(exhibitionId);

                List<ArtpieceViewModel> artpieceViewModels = new List<ArtpieceViewModel>();
                this._mapper.Map(artpieces, artpieceViewModels);

                return Ok(artpieceViewModels);
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Organiser")]
        [HttpGet("room/{roomId}")]
        public async Task<IActionResult> GetRoomArtpiecesAsync(int roomId)
        {
            try
            {
                List<Artpiece> artpieces = await this._artpieceService.GetRoomArtpiecesAsync(roomId);

                List<ArtpieceViewModel> artpieceViewModels = new List<ArtpieceViewModel>();
                this._mapper.Map(artpieces, artpieceViewModels);

                return Ok(artpieceViewModels);
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }
        
        [Authorize(Roles = "Organiser")]
        [HttpGet("room/{exhibitionId}/available")]
        public async Task<IActionResult> GetRoomAvailableArtpiecesAsync(int exhibitionId)
        {
            try
            {
                List<Artpiece> artpieces = await this._artpieceService.GetRoomAvailableArtpiecesAsync(exhibitionId);

                List<ArtpieceViewModel> artpieceViewModels = new List<ArtpieceViewModel>();
                this._mapper.Map(artpieces, artpieceViewModels);

                return Ok(artpieceViewModels);
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{artpieceId}")]
        public async Task<IActionResult> GetArtpieceAsync(string artpieceId)
        {
            try
            {
                Artpiece artpiece = await this._artpieceService.GetArtpieceAsync(artpieceId);

                ArtpieceViewModel artpieceViewModel = new ArtpieceViewModel();
                this._mapper.Map(artpiece, artpieceViewModel);

                return Ok(artpieceViewModel);
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "ArtOwner")]
        [HttpPost]
        public async Task<IActionResult> AddArtpieceAsync([FromForm] ArtpieceAddViewModel artpieceAddViewModel)
        {
            try
            {
                ArtpieceDto artpieceDto = new ArtpieceDto();
                this._mapper.Map(artpieceAddViewModel, artpieceDto);
                artpieceDto.OwnerId = this._userAccessor.GetUserId();

                Artpiece artpiece = await this._artpieceService.AddArtpieceAsync(artpieceDto);

                ArtpieceViewModel artpieceViewModel = new ArtpieceViewModel();
                this._mapper.Map(artpiece, artpieceViewModel);

                return Ok(artpieceViewModel);
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "ArtOwner")]
        [HttpPut]
        public async Task<IActionResult> UpdateArtpieceAsync(ArtpieceUpdateViewModel artpieceUpdateViewModel)
        {
            try
            {
                ArtpieceDto artpieceDto = new ArtpieceDto();
                this._mapper.Map(artpieceUpdateViewModel, artpieceDto);
                artpieceDto.OwnerId = this._userAccessor.GetUserId();

                Artpiece artpiece = await this._artpieceService.UpdateArtpieceAsync(artpieceDto);

                ArtpieceViewModel artpieceViewModel = new ArtpieceViewModel();
                this._mapper.Map(artpiece, artpieceViewModel);

                return Ok(artpieceViewModel);
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "ArtOwner")]
        [HttpPost("{artpieceId}/picture")]
        public async Task<IActionResult> UpdateArtpiecePicture(string artpieceId, IFormFile file)
        {
            try
            {
                Photo photo = await this._artpieceService.UpdateArtpiecePictureAsync(artpieceId, file);

                PhotoViewModel photoViewModel = new PhotoViewModel();
                this._mapper.Map(photo, photoViewModel);

                return Ok(photoViewModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "ArtOwner")]
        [HttpDelete("{artpieceId}")]
        public async Task<IActionResult> DeleteArtpieceAsync(string artpieceId)
        {
            try
            {
                await this._artpieceService.DeleteArtpieceAsync(artpieceId);

                return Ok();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }
    }
}
