using ArtFlow.BLL.Abstractions;
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
    public class StateService : IStateService
    {
        private readonly IBaseRepository<State> _stateRepository;
        private readonly IBaseRepository<Order> _orderRepository;
        private readonly IBaseRepository<Artpiece> _artpieceRepository;
        private readonly ILogger<StateService> _logger;

        public StateService(IBaseRepository<State> stateRepository, 
            IBaseRepository<Order> orderRepository, 
            IBaseRepository<Artpiece> artpieceRepository, 
            ILogger<StateService> logger)
        {
            _stateRepository = stateRepository;
            _orderRepository = orderRepository;
            _artpieceRepository = artpieceRepository;
            _logger = logger;
        }

        public async Task<bool> AddStateAsync(State state)
        {
            if(state.OrderId <= 0)
            {
                throw new ArgumentNullException("Order id must be greater than 0");
            }

            try
            {
                Order order = await this._orderRepository
                    .GetAll()
                    .FirstOrDefaultAsync(o => o.OrderId == state.OrderId);

                this._stateRepository.Add(state);
                await this._stateRepository.SaveChangesAsync();

                Artpiece artpiece = await this._artpieceRepository
                    .GetAll()
                    .Include(k => k.KeepRecommendation)
                    .FirstOrDefaultAsync(a => a.ArtpieceId == order.ArtpieceId);

                if(artpiece.KeepRecommendation.MinTemperature < state.Temperature
                    && artpiece.KeepRecommendation.MaxTemperature > state.Temperature
                    && artpiece.KeepRecommendation.MinHumidity < state.Humidity
                    && artpiece.KeepRecommendation.MaxHumidity > state.Humidity
                    && artpiece.KeepRecommendation.MinLight < state.Light
                    && artpiece.KeepRecommendation.MaxLight > state.Light)
                {
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<bool> CheckLatestStateAsync(int orderId)
        {
            if (orderId <= 0)
            {
                throw new ArgumentNullException("Order id must be greater than 0");
            }

            try
            {
                Order order = await this._orderRepository
                    .GetAll()
                    .Include(s => s.States)
                    .FirstOrDefaultAsync(o => o.OrderId == orderId);

                State state = order.States.OrderByDescending(o => o.CheckedOn).FirstOrDefault();

                Artpiece artpiece = await this._artpieceRepository
                    .GetAll()
                    .Include(k => k.KeepRecommendation)
                    .FirstOrDefaultAsync(a => a.ArtpieceId == order.ArtpieceId);

                if (state is not null && artpiece.KeepRecommendation.MinTemperature < state.Temperature
                    && artpiece.KeepRecommendation.MaxTemperature > state.Temperature
                    && artpiece.KeepRecommendation.MinHumidity < state.Humidity
                    && artpiece.KeepRecommendation.MaxHumidity > state.Humidity
                    && artpiece.KeepRecommendation.MinLight < state.Light
                    && artpiece.KeepRecommendation.MaxLight > state.Light)
                {
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<State> GetLatestStateAsync(int orderId)
        {
            if (orderId <= 0)
            {
                throw new ArgumentNullException("Order id must be greater than 0");
            }

            try
            {
                Order order = await this._orderRepository
                    .GetAll()
                    .Include(s => s.States)
                    .FirstOrDefaultAsync(o => o.OrderId == orderId);
                
                State state = order.States.OrderByDescending(o => o.CheckedOn).FirstOrDefault();

                return state;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<List<State>> GetStatesForOrderAsync(int orderId)
        {
            if (orderId <= 0)
            {
                throw new ArgumentNullException("Order id must be greater than 0");
            }

            try
            {
                List<State> states = await this._orderRepository
                    .GetAll()
                    .Include(s => s.States)
                    .SelectMany(s => s.States)
                    .ToListAsync();
                return states;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }
    }
}
