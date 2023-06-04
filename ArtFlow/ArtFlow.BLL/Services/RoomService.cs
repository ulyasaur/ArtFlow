using ArtFlow.BLL.Abstractions;
using ArtFlow.BLL.Validator;
using ArtFlow.BLL.Validators;
using ArtFlow.Core.Entities;
using ArtFlow.Core.Enums;
using ArtFlow.DAL.Abstractions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.BLL.Services
{
    public class RoomService : IRoomService
    {
        private readonly IBaseRepository<Room> _roomRepository;
        private readonly IBaseRepository<RoomArtpiece> _roomArtpieceRepository;
        private readonly IBaseRepository<Artpiece> _artpieceRepository;
        private readonly IBaseRepository<Exhibition> _exhibitionRepository;
        private readonly IValidator<Room> _roomValidator;
        private readonly ILogger<RoomService> _logger;

        public RoomService(IBaseRepository<Room> roomRepository, 
            IBaseRepository<RoomArtpiece> roomArtpieceRepository, 
            IBaseRepository<Artpiece> artpieceRepository, 
            IBaseRepository<Exhibition> exhibitionRepository, 
            ILogger<RoomService> logger)
        {
            _roomRepository = roomRepository;
            _roomArtpieceRepository = roomArtpieceRepository;
            _artpieceRepository = artpieceRepository;
            _exhibitionRepository = exhibitionRepository;
            _roomValidator = new RoomValidator();
            _logger = logger;
        }

        public async Task AddArtpieceToRoomAsync(int roomId, string artpieceId)
        {
            if (roomId <= 0)
            {
                throw new ArgumentNullException("Room id must be greater than 0");
            }

            if (string.IsNullOrEmpty(artpieceId))
            {
                throw new ArgumentNullException("Artpiece id must not be null");
            }

            try
            {
                Room room = await this._roomRepository
                    .GetAll()
                    .Include(ra => ra.RoomArtpieces)
                    .FirstOrDefaultAsync(r => r.RoomId == roomId);
                Artpiece artpiece = await this._artpieceRepository.FindByIdAsync(artpieceId);

                if(room.RoomArtpieces.Count == room.MaxNumberOfPieces)
                {
                    throw new ArgumentException("Room is full, artpiece can not be added");
                }

                this._roomArtpieceRepository.Add(new RoomArtpiece
                {
                    RoomId = roomId,
                    ArtpieceId = artpieceId
                });
                await this._roomArtpieceRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<Room> AddRoomAsync(Room room)
        {
            if(!this._roomValidator.Validate(room))
            {
                throw new ArgumentException("Room is not valid");
            }

            try
            {
                Exhibition exhibition = await this._exhibitionRepository.FindByIdAsync(room.ExhibitionId);

                this._roomRepository.Add(room);
                await this._roomRepository.SaveChangesAsync();

                Room added = await this._roomRepository
                    .GetAll()
                    .Include(e => e.Exhibition)
                    .Include(ra => ra.RoomArtpieces)
                        .ThenInclude(a => a.Artpiece)
                     .OrderByDescending(r => r.RoomId)
                    .FirstOrDefaultAsync(r => r.ExhibitionId == room.ExhibitionId);

                return added;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task DeleteArtpieceFromRoomAsync(int roomId, string artpieceId)
        {
            if (roomId <= 0)
            {
                throw new ArgumentNullException("Room id must be greater than 0");
            }

            if (string.IsNullOrEmpty(artpieceId))
            {
                throw new ArgumentNullException("Artpiece id must not be null");
            }

            try
            {
                Room room = await this._roomRepository.FindByIdAsync(roomId);
                Artpiece artpiece = await this._artpieceRepository.FindByIdAsync(artpieceId);
                RoomArtpiece roomArtpiece = await this._roomArtpieceRepository.FindByIdAsync(roomId, artpieceId);

                this._roomArtpieceRepository.Remove(roomArtpiece);
                await this._roomArtpieceRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task DeleteRoomAsync(int roomId)
        {
            if (roomId <= 0)
            { 
                throw new ArgumentNullException("Room id must be greater than 0");
            }

            try
            {
                Room room = await this._roomRepository.FindByIdAsync(roomId);

                this._roomRepository.Remove(room);
                await this._roomRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<List<Room>> GetExhibitionRoomsAsync(int exhibitionId)
        {
            if (exhibitionId <= 0)
            {
                throw new ArgumentNullException("Exhibition id must be greater than 0");
            }

            try
            {
                List<Room> rooms = await this._roomRepository
                    .GetAll()
                    .Include(e => e.Exhibition)
                    .Include(ra => ra.RoomArtpieces)
                        .ThenInclude(a => a.Artpiece)
                    .Where(r => r.ExhibitionId == exhibitionId)
                    .ToListAsync();
                return rooms;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<Room> GetRoomAsync(int roomId)
        {
            if (roomId <= 0)
            {
                throw new ArgumentNullException("Room id must be greater than 0");
            }

            try
            {
                Room room = await this._roomRepository
                    .GetAll()
                    .Include(e => e.Exhibition)
                    .Include(ra => ra.RoomArtpieces)
                        .ThenInclude(a => a.Artpiece)
                    .FirstOrDefaultAsync(r => r.RoomId == roomId);
                return room;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }
    }
}
