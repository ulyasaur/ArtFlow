using ArtFlow.BLL.Abstractions;
using ArtFlow.BLL.DTOs;
using ArtFlow.BLL.Validator;
using ArtFlow.Core.Entities;
using ArtFlow.Core.Enums;
using ArtFlow.DAL.Abstractions;
using ArtFlow.DAL.Photos.Abstractions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace ArtFlow.BLL.Services
{
    public class ArtpieceService : IArtpieceService
    {
        private readonly IBaseRepository<Artpiece> _artpieceRepository;
        private readonly IBaseRepository<User> _userRepository;
        private readonly IBaseRepository<Exhibition> _exhibitionRepository;
        private readonly IBaseRepository<Room> _roomRepository;
        private readonly IPhotoAccessor _photoAccessor;
        private readonly ILogger<ArtpieceService> _logger;
        private readonly IValidator<Artpiece> _artpieceValidator;
        private readonly IValidator<KeepRecommendation> _keepRecommendationValidator;

        public ArtpieceService(IBaseRepository<Artpiece> artpieceRepository, 
            IBaseRepository<User> userRepository, 
            IBaseRepository<Exhibition> exhibitionRepository, 
            IBaseRepository<Room> roomRepository, 
            IPhotoAccessor photoAccessor,
            ILogger<ArtpieceService> logger)
        {
            _artpieceRepository = artpieceRepository;
            _userRepository = userRepository;
            _exhibitionRepository = exhibitionRepository;
            _roomRepository = roomRepository;
            _photoAccessor = photoAccessor;
            _logger = logger;
            _artpieceValidator = new ArtpieceValidator();
            _keepRecommendationValidator = new KeepRecommendationValidator();
        }

        public async Task AddArtpieceAsync(ArtpieceDto artpieceDto)
        {
            Artpiece artpiece = new Artpiece
            {
                Name = artpieceDto.Name,
                Description = artpieceDto.Description,
                AuthorName = artpieceDto.AuthorName,
                OwnerId = artpieceDto.OwnerId,
                KeepRecommendation = new KeepRecommendation
                {
                    MinTemperature = artpieceDto.MinTemperature,
                    MaxTemperature = artpieceDto.MaxTemperature,
                    MinHumidity = artpieceDto.MinHumidity,
                    MaxHumidity = artpieceDto.MaxHumidity,
                    MinLight = artpieceDto.MinLight,
                    MaxLight = artpieceDto.MaxLight
                }
            };

            if(!this._artpieceValidator.Validate(artpiece))
            {
                throw new ArgumentException("Artpiece is not valid");
            }

            if(!this._keepRecommendationValidator.Validate(artpiece.KeepRecommendation))
            {
                throw new ArgumentException("Keep recommendation is not valid");
            }

            try
            {
                User user = await this._userRepository.FindByIdAsync(artpiece.OwnerId);

                artpiece.Photo = await this._photoAccessor.AddPhoto(artpieceDto.Photo);

                this._artpieceRepository.Add(artpiece);
                await this._artpieceRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task DeleteArtpieceAsync(int artpieceId)
        {
            if (artpieceId <= 0)
            {
                throw new ArgumentNullException("Artpiece id must be greater than 0");
            }

            try
            {
                Artpiece artpiece = await this._artpieceRepository.FindByIdAsync(artpieceId);

                this._artpieceRepository.Remove(artpiece);
                await this._artpieceRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<Artpiece> GetArtpieceAsync(int artpieceId)
        {
            if (artpieceId <= 0)
            {
                throw new ArgumentNullException("Artpiece id must be greater than 0");
            }

            try
            {
                Artpiece artpiece = await this._artpieceRepository
                    .GetAll()
                    .Include(p => p.Photo)
                    .Include(o => o.Owner)
                    .Include(k => k.KeepRecommendation)
                    .FirstOrDefaultAsync(a => a.ArtpieceId == artpieceId);

                return artpiece;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<List<Artpiece>> GetOwnerArtpiecesAsync(string ownerId)
        {
            if (string.IsNullOrEmpty(ownerId))
            {
                throw new ArgumentNullException("Owner id must not be null");
            }

            try
            {
                User user = await this._userRepository.FindByIdAsync(ownerId);

                List<Artpiece> artpieces = await this._artpieceRepository
                    .GetAll()
                    .Include(p => p.Photo)
                    .Include(o => o.Owner)
                    .Include(k => k.KeepRecommendation)
                    .Where(a => a.OwnerId == ownerId)
                    .ToListAsync();

                return artpieces;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<List<Artpiece>> GetAvailableArtpiecesAsync()
        {
            try
            {
                List<Artpiece> artpieces = await this._artpieceRepository
                    .GetAll()
                    .Include(p => p.Photo)
                    .Include(o => o.Owner)
                    .Include(k => k.KeepRecommendation)
                    .Include(o => o.Orders)
                    .Where(a => !a.Orders.Any() 
                        || a.Orders
                            .OrderByDescending(o => o.UpdatedOn)
                            .FirstOrDefault().Status == DeliveryStatus.Returned)
                    .ToListAsync();
                return artpieces;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<List<Artpiece>> GetExhibitionArtpiecesAsync(int exhibitionId)
        {
            if (exhibitionId <= 0)
            {
                throw new ArgumentNullException("Exhibition id must be greater than 0");
            }

            try
            {
                Exhibition exhibition = await this._exhibitionRepository.FindByIdAsync(exhibitionId);

                List<Artpiece> artpieces = await this._artpieceRepository
                    .GetAll()
                    .Include(p => p.Photo)
                    .Include(o => o.Owner)
                    .Include(k => k.KeepRecommendation)
                    .Include(ea => ea.ExhibitionArtpieces)
                    .Where(a => a.ExhibitionArtpieces.Any(ea => ea.ExhibitionId == exhibitionId))
                    .ToListAsync();
                return artpieces;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<List<Artpiece>> GetRoomArtpiecesAsync(int roomId)
        {
            if (roomId <= 0)
            {
                throw new ArgumentNullException("Exhibition id must be greater than 0");
            }

            try
            {
                Room room = await this._roomRepository.FindByIdAsync(roomId);

                List<Artpiece> artpieces = await this._artpieceRepository
                    .GetAll()
                    .Include(p => p.Photo)
                    .Include(o => o.Owner)
                    .Include(k => k.KeepRecommendation)
                    .Include(ra => ra.RoomArtpieces)
                    .Where(a => a.RoomArtpieces.Any(ra => ra.RoomId == roomId))
                    .ToListAsync();
                return artpieces;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task UpdateArtpieceAsync(ArtpieceDto artpieceDto)
        {
            if (artpieceDto.ArtpieceId <= 0)
            {
                throw new ArgumentNullException("Artpiece id must be greater than 0");
            }

            if (artpieceDto.KeepRecommendationId <= 0)
            {
                throw new ArgumentNullException("Keep recommendation id must be greater than 0");
            }

            Artpiece artpiece = new Artpiece
            {
                ArtpieceId = artpieceDto.ArtpieceId,
                Name = artpieceDto.Name,
                Description = artpieceDto.Description,
                AuthorName = artpieceDto.AuthorName,
                OwnerId = artpieceDto.OwnerId,
                KeepRecommendation = new KeepRecommendation
                {
                    KeepRecommendationId = artpieceDto.KeepRecommendationId,
                    MinTemperature = artpieceDto.MinTemperature,
                    MaxTemperature = artpieceDto.MaxTemperature,
                    MinHumidity = artpieceDto.MinHumidity,
                    MaxHumidity = artpieceDto.MaxHumidity,
                    MinLight = artpieceDto.MinLight,
                    MaxLight = artpieceDto.MaxLight
                }
            };

            if (!this._artpieceValidator.Validate(artpiece))
            {
                throw new ArgumentException("Artpiece is not valid");
            }

            if (!this._keepRecommendationValidator.Validate(artpiece.KeepRecommendation))
            {
                throw new ArgumentException("Keep recommendation is not valid");
            }

            try
            {
                User user = await this._userRepository.FindByIdAsync(artpiece.OwnerId);

                Artpiece existingArtpiece = await this._artpieceRepository
                    .GetAll()
                    .AsNoTracking()
                    .Include(p => p.Photo)
                    .Include(o => o.Owner)
                    .Include(k => k.KeepRecommendation)
                    .FirstOrDefaultAsync(a => a.ArtpieceId == artpieceDto.ArtpieceId);

                existingArtpiece.ArtpieceId = artpiece.ArtpieceId;
                existingArtpiece.Name = artpiece.Name;
                existingArtpiece.Description = artpiece.Description;
                existingArtpiece.AuthorName = artpiece.AuthorName;
                existingArtpiece.OwnerId = artpiece.OwnerId;
                existingArtpiece.KeepRecommendation.MinTemperature = artpieceDto.MinTemperature;
                existingArtpiece.KeepRecommendation.MaxTemperature = artpieceDto.MaxTemperature;
                existingArtpiece.KeepRecommendation.MinHumidity = artpieceDto.MinHumidity;
                existingArtpiece.KeepRecommendation.MaxHumidity = artpieceDto.MaxHumidity;
                existingArtpiece.KeepRecommendation.MinLight = artpieceDto.MinLight;
                existingArtpiece.KeepRecommendation.MaxLight = artpieceDto.MaxLight;

                this._artpieceRepository.Update(existingArtpiece);
                await this._artpieceRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }
    }
}
