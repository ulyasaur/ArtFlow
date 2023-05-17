using ArtFlow.BLL.Abstractions;
using ArtFlow.Core.Entities;
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
    public class RoomsController : ControllerBase
    {
        private readonly IRoomService _roomService;
        private readonly IMapper _mapper;
        private readonly ILogger<RoomsController> _logger;

        public RoomsController(IRoomService roomService, 
            IMapper mapper, 
            ILogger<RoomsController> logger)
        {
            _roomService = roomService;
            _mapper = mapper;
            _logger = logger;
        }

        [Authorize(Roles = "Organiser")]
        [HttpGet("exhibition/{exhibitionId}")]
        public async Task<IActionResult> GetExhibitionRooms(int exhibitionId)
        {
            try
            {
                List<Room> rooms = await this._roomService.GetExhibitionRoomsAsync(exhibitionId);

                List<RoomViewModel> roomViewModels = new List<RoomViewModel>();
                this._mapper.Map(rooms, roomViewModels);

                return Ok(roomViewModels);
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Organiser")]
        [HttpGet("{roomId}")]
        public async Task<IActionResult> GetRoom(int roomId)
        {
            try
            {
                Room room = await this._roomService.GetRoomAsync(roomId);

                RoomViewModel roomViewModel = new RoomViewModel();
                this._mapper.Map(room, roomViewModel);

                return Ok(roomViewModel);
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Organiser")]
        [HttpPost]
        public async Task<IActionResult> AddRoom(RoomAddViewModel roomAddViewModel)
        {
            try
            {
                Room room = new Room();
                this._mapper.Map(roomAddViewModel, room);

                Room added = await this._roomService.AddRoomAsync(room);

                RoomViewModel addedViewModel = new RoomViewModel();
                this._mapper.Map(added, addedViewModel);

                return Ok(addedViewModel);
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Organiser")]
        [HttpDelete("{roomId}")]
        public async Task<IActionResult> DeleteRoom(int roomId)
        {
            try
            {
                await this._roomService.DeleteRoomAsync(roomId);

                return Ok();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Organiser")]
        [HttpPost("{roomId}/{artpieceId}")]
        public async Task<IActionResult> AddArtpieceToRoomRoom(int roomId, string artpieceId)
        {
            try
            {
                await this._roomService.AddArtpieceToRoomAsync(roomId, artpieceId);

                return Ok();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Organiser")]
        [HttpDelete("{roomId}/{artpieceId}")]
        public async Task<IActionResult> DeleteArtpieceFromRoomRoom(int roomId, string artpieceId)
        {
            try
            {
                await this._roomService.DeleteArtpieceFromRoomAsync(roomId, artpieceId);

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
