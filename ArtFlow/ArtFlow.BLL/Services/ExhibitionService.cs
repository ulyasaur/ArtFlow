using ArtFlow.BLL.Abstractions;
using ArtFlow.BLL.Validator;
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
    public class ExhibitionService : IExhibitionService
    {
        private readonly IBaseRepository<Exhibition> _exhibitionRepository;
        private readonly IBaseRepository<User> _userRepository;
        private readonly IValidator<Exhibition> _exhibitionValidator;
        private readonly ILogger<ExhibitionService> _logger;

        public ExhibitionService(IBaseRepository<Exhibition> exhibitionRepository, 
            IBaseRepository<User> userRepository, 
            ILogger<ExhibitionService> logger)
        {
            _exhibitionRepository = exhibitionRepository;
            _userRepository = userRepository;
            _logger = logger;
            _exhibitionValidator = new ExhibitionValidator();
        }

        public async Task AddExhibitionAsync(Exhibition exhibition)
        {
            if (!this._exhibitionValidator.Validate(exhibition))
            {
                throw new ArgumentException("Exhibition is not valid");
            }

            try
            {
                User organiser = await this._userRepository.FindByIdAsync(exhibition.OrganiserId);

                this._exhibitionRepository.Add(exhibition);
                await this._exhibitionRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task DeleteExhibitionAsync(int exhibitionId)
        {
            if (exhibitionId <= 0)
            {
                throw new ArgumentNullException("Exhibition id must be greater than 0");
            }

            try
            {
                Exhibition exhibition = await this._exhibitionRepository.FindByIdAsync(exhibitionId);

                this._exhibitionRepository.Remove(exhibition);
                await this._exhibitionRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<Exhibition> GetExhibitionAsync(int exhibitionId)
        {
            if (exhibitionId <= 0)
            {
                throw new ArgumentNullException("Exhibition id must be greater than 0");
            }

            try
            {
                Exhibition exhibition = await this._exhibitionRepository
                    .GetAll()
                    .Include(u => u.Organiser)
                    .Include(ea => ea.ExhibitionArtpieces)
                    .Include(o => o.Orders)
                    .Include(r => r.Rooms)
                    .FirstOrDefaultAsync(e => e.ExhibitionId == exhibitionId);
                return exhibition;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<List<Exhibition>> GetUserExhibitionsAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentNullException("Exhibition id must be greater than 0");
            }

            try
            {
                List<Exhibition> exhibitions = await this._exhibitionRepository
                    .GetAll()
                    .Include(u => u.Organiser)
                    .Include(ea => ea.ExhibitionArtpieces)
                    .Include(o => o.Orders)
                    .Include(r => r.Rooms)
                    .Where(e => e.OrganiserId.Equals(userId))
                    .ToListAsync();
                return exhibitions;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task UpdateExhibitionAsync(Exhibition exhibition)
        {
            if (exhibition.ExhibitionId <= 0)
            {
                throw new ArgumentNullException("Exhibition id must be greater than 0");
            }

            if (!this._exhibitionValidator.Validate(exhibition))
            {
                throw new ArgumentException("Exhibition is not valid");
            }

            try
            {
                Exhibition existingExhibition = await this._exhibitionRepository
                    .GetAll()
                    .AsNoTracking()
                    .FirstOrDefaultAsync(e => e.ExhibitionId == exhibition.ExhibitionId);

                existingExhibition.Name = exhibition.Name;
                existingExhibition.Description = exhibition.Description;
                existingExhibition.StartDate = exhibition.StartDate;
                existingExhibition.EndDate = exhibition.EndDate;
                existingExhibition.Adress = exhibition.Adress;

                this._exhibitionRepository.Update(existingExhibition);
                this._exhibitionRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }
    }
}
