using ArtFlow.BLL.Abstractions;
using ArtFlow.BLL.Validator;
using ArtFlow.BLL.Validators;
using ArtFlow.Core.Entities;
using ArtFlow.Core.Enums;
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
    public class OrderService : IOrderService
    {
        private readonly IBaseRepository<Order> _orderRepository;
        private readonly IBaseRepository<User> _userRepository;
        private readonly IBaseRepository<Artpiece> _artpieceRepository;
        private readonly IBaseRepository<Exhibition> _exhibitionRepository;
        private readonly IBaseRepository<ExhibitionArtpiece> _exhibitionArtpieceRepository;
        private readonly IValidator<Order> _orderValidator;
        private readonly ILogger<OrderService> _logger;

        public OrderService(IBaseRepository<Order> orderRepository, 
            IBaseRepository<User> userRepository, 
            IBaseRepository<Artpiece> artpieceRepository, 
            IBaseRepository<Exhibition> exhibitionRepository, 
            IBaseRepository<ExhibitionArtpiece> exhibitionArtpieceRepository, 
            ILogger<OrderService> logger)
        {
            _orderRepository = orderRepository;
            _userRepository = userRepository;
            _artpieceRepository = artpieceRepository;
            _exhibitionRepository = exhibitionRepository;
            _exhibitionArtpieceRepository = exhibitionArtpieceRepository;
            _orderValidator = new OrderValidator();
            _logger = logger;
        }

        public async Task AcceptOrderByDriverAsync(int orderId, string driverId)
        {
            if (orderId <= 0)
            {
                throw new ArgumentNullException("Order id must be greater than 0");
            }

            if (string.IsNullOrEmpty(driverId))
            {
                throw new ArgumentNullException("User id must be greater than 0");
            }

            try
            {
                User user = await this._userRepository.FindByIdAsync(driverId);

                Order order = await this._orderRepository
                    .GetAll()
                    .AsNoTracking()
                    .FirstOrDefaultAsync(o => o.OrderId == orderId);

                order.Status = DeliveryStatus.ApprovedByDriver;
                order.Driver = user;
                order.UpdatedOn = DateTimeOffset.UtcNow;

                this._orderRepository.Update(order);
                await this._orderRepository.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task AddOrderAsync(Order order)
        {
            if (!this._orderValidator.Validate(order))
            {
                throw new ArgumentException("Order is not valid");
            }

            try
            {
                User customer = await this._userRepository.FindByIdAsync(order.CustomerId);
                Artpiece artpiece = await this._artpieceRepository.FindByIdAsync(order.ArtpieceId);
                order.SellerId = artpiece.OwnerId;
                Exhibition exhibition = await this._exhibitionRepository.FindByIdAsync(order.ExhibitionId);

                this._orderRepository.Add(order);
                await this._orderRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task ApproveOrderByOwnerAsync(int orderId)
        {
            if (orderId <= 0)
            {
                throw new ArgumentNullException("Order id must be greater than 0");
            }

            try
            {
                Order order = await this._orderRepository
                    .GetAll()
                    .AsNoTracking()
                    .FirstOrDefaultAsync(o => o.OrderId == orderId);

                order.Status = DeliveryStatus.ApprovedbyOwner;
                order.UpdatedOn = DateTimeOffset.UtcNow;

                this._orderRepository.Update(order);
                await this._orderRepository.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<List<Order>> GetDriverOrdersAvailableAsync()
        {
            try
            {
                List<Order> orders = await this._orderRepository
                    .GetAll()
                    .Include(s => s.Seller)
                        .ThenInclude(p => p.Photo)
                    .Include(c => c.Customer)
                        .ThenInclude(p => p.Photo)
                    .Include(a => a.Artpiece)
                        .ThenInclude(p => p.Photo)
                    .Include(a => a.Artpiece)
                        .ThenInclude(k => k.KeepRecommendation)
                    .Include(e => e.Exhibition)
                    .Where(o => o.Status == DeliveryStatus.ApprovedbyOwner)
                    .ToListAsync();
                return orders;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<List<Order>> GetDriverOrdersInProgressAsync(string driverId)
        {
            if (string.IsNullOrWhiteSpace(driverId))
            {
                throw new ArgumentNullException("User id must not be null");
            }

            try
            {
                User user = await this._userRepository.FindByIdAsync(driverId);

                List<Order> orders = await this._orderRepository
                    .GetAll()
                    .Include(s => s.Seller)
                        .ThenInclude(p => p.Photo)
                    .Include(c => c.Customer)
                        .ThenInclude(p => p.Photo)
                    .Include(a => a.Artpiece)
                        .ThenInclude(p => p.Photo)
                    .Include(a => a.Artpiece)
                        .ThenInclude(k => k.KeepRecommendation)
                    .Include(e => e.Exhibition)
                    .Include(d => d.Driver)
                        .ThenInclude(p => p.Photo)
                    .OrderByDescending(o => o.UpdatedOn)
                    .Where(o => o.DriverId.Equals(driverId))
                    .ToListAsync();
                return orders;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<List<Order>> GetExhibitionOrdersAsync(int exhibitionId)
        {
            if (exhibitionId <= 0)
            {
                throw new ArgumentNullException("Exhibition id must be greater than 0");
            }

            try
            {
                Exhibition exhibition = await this._exhibitionRepository.FindByIdAsync(exhibitionId);

                List<Order> orders = await this._orderRepository
                    .GetAll()
                    .Include(s => s.Seller)
                        .ThenInclude(p => p.Photo)
                    .Include(c => c.Customer)
                        .ThenInclude(p => p.Photo)
                    .Include(a => a.Artpiece)
                        .ThenInclude(p => p.Photo)
                    .Include(a => a.Artpiece)
                        .ThenInclude(k => k.KeepRecommendation)
                    .Include(e => e.Exhibition)
                    .Include(d => d.Driver)
                        .ThenInclude(p => p.Photo)
                    .OrderByDescending(o => o.UpdatedOn)
                    .Where(o => o.ExhibitionId.Equals(exhibitionId))
                    .ToListAsync();
                return orders;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<Order> GetOrderAsync(int orderId)
        {
            if(orderId <= 0)
            {
                throw new ArgumentNullException("Order id must be greater than 0");
            }

            try
            {
                Order order = await this._orderRepository
                    .GetAll()
                    .Include(s => s.Seller)
                        .ThenInclude(p => p.Photo)
                    .Include(c => c.Customer)
                        .ThenInclude(p => p.Photo)
                    .Include(a => a.Artpiece)
                        .ThenInclude(p => p.Photo)
                    .Include(a => a.Artpiece)
                        .ThenInclude(k => k.KeepRecommendation)
                    .Include(d => d.Driver)
                        .ThenInclude(p => p.Photo)
                    .Include(e => e.Exhibition)
                    .OrderByDescending(o => o.UpdatedOn)
                    .FirstOrDefaultAsync(o => o.OrderId == orderId);
                return order;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<Order> GetOrderByArtpieceAsync(string artpieceId)
        {
            if (string.IsNullOrEmpty(artpieceId))
            {
                throw new ArgumentNullException("Artpiece id must not be null");
            }

            try
            {
                Order order = await this._orderRepository
                    .GetAll()
                    .Include(s => s.Seller)
                        .ThenInclude(p => p.Photo)
                    .Include(c => c.Customer)
                        .ThenInclude(p => p.Photo)
                    .Include(a => a.Artpiece)
                        .ThenInclude(p => p.Photo)
                    .Include(a => a.Artpiece)
                        .ThenInclude(k => k.KeepRecommendation)
                    .Include(d => d.Driver)
                        .ThenInclude(p => p.Photo)
                    .Include(e => e.Exhibition)
                    .OrderByDescending(o => o.UpdatedOn)
                    .FirstOrDefaultAsync(o => 
                        o.ArtpieceId.Equals(artpieceId));

                return order;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<List<Order>> GetOrganiserOrdersAsync(string organiserId)
        {
            if (string.IsNullOrWhiteSpace(organiserId))
            {
                throw new ArgumentNullException("User id must not be null");
            }

            try
            {
                User user = await this._userRepository.FindByIdAsync(organiserId);

                List<Order> orders = await this._orderRepository
                    .GetAll()
                    .Include(s => s.Seller)
                        .ThenInclude(p => p.Photo)
                    .Include(c => c.Customer)
                        .ThenInclude(p => p.Photo)
                    .Include(a => a.Artpiece)
                        .ThenInclude(p => p.Photo)
                    .Include(a => a.Artpiece)
                        .ThenInclude(k => k.KeepRecommendation)
                    .Include(d => d.Driver)
                        .ThenInclude(p => p.Photo)
                    .Include(e => e.Exhibition)
                    .OrderByDescending(o => o.UpdatedOn)
                    .Where(o => o.CustomerId.Equals(organiserId))
                    .ToListAsync();
                return orders;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<List<Order>> GetOwnerOrdersAsync(string ownerId)
        {
            if (string.IsNullOrWhiteSpace(ownerId))
            {
                throw new ArgumentNullException("User id must not be null");
            }

            try
            {
                User user = await this._userRepository.FindByIdAsync(ownerId);

                List<Order> orders = await this._orderRepository
                    .GetAll()
                    .Include(s => s.Seller)
                        .ThenInclude(p => p.Photo)
                    .Include(c => c.Customer)
                        .ThenInclude(p => p.Photo)
                    .Include(a => a.Artpiece)
                        .ThenInclude(p => p.Photo)
                    .Include(a => a.Artpiece)
                        .ThenInclude(k => k.KeepRecommendation)
                    .Include(d => d.Driver)
                        .ThenInclude(p => p.Photo)
                    .Include(e => e.Exhibition)
                    .OrderByDescending(o => o.UpdatedOn)
                    .Where(o => o.SellerId.Equals(ownerId))
                    .ToListAsync();
                return orders;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task SetOrderCanceledAsync(int orderId)
        {
            if (orderId <= 0)
            {
                throw new ArgumentNullException("Order id must be greater than 0");
            }

            try
            {
                Order order = await this._orderRepository
                    .GetAll()
                    .AsNoTracking()
                    .FirstOrDefaultAsync(o => o.OrderId == orderId);

                order.Status = DeliveryStatus.Cancel;
                order.UpdatedOn = DateTimeOffset.UtcNow;

                this._orderRepository.Update(order);
                await this._orderRepository.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task SetOrderDeclinedAsync(int orderId)
        {
            if (orderId <= 0)
            {
                throw new ArgumentNullException("Order id must be greater than 0");
            }

            try
            {
                Order order = await this._orderRepository
                    .GetAll()
                    .AsNoTracking()
                    .FirstOrDefaultAsync(o => o.OrderId == orderId);

                order.Status = DeliveryStatus.Declined;
                order.UpdatedOn = DateTimeOffset.UtcNow;

                this._orderRepository.Update(order);
                await this._orderRepository.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task SetOrderDeliveredAsync(int orderId)
        {
            if (orderId <= 0)
            {
                throw new ArgumentNullException("Order id must be greater than 0");
            }

            try
            {
                Order order = await this._orderRepository
                    .GetAll()
                    .AsNoTracking()
                    .FirstOrDefaultAsync(o => o.OrderId == orderId);

                order.Status = DeliveryStatus.Delivered;
                order.UpdatedOn = DateTimeOffset.UtcNow;

                this._orderRepository.Update(order);
                await this._orderRepository.SaveChangesAsync();

                Artpiece artpiece = await this._artpieceRepository.FindByIdAsync(order.ArtpieceId);
                Exhibition exhibition = await this._exhibitionRepository.FindByIdAsync(order.ExhibitionId);

                this._exhibitionArtpieceRepository.Add(new ExhibitionArtpiece
                {
                    ArtPieceId = order.ArtpieceId,
                    ExhibitionId = order.ExhibitionId
                });
                await this._exhibitionArtpieceRepository.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task SetOrderInProgressAsync(int orderId)
        {
            if (orderId <= 0)
            {
                throw new ArgumentNullException("Order id must be greater than 0");
            }

            try
            {
                Order order = await this._orderRepository
                    .GetAll()
                    .AsNoTracking()
                    .FirstOrDefaultAsync(o => o.OrderId == orderId);

                order.Status = DeliveryStatus.InProgress;
                order.UpdatedOn = DateTimeOffset.UtcNow;

                this._orderRepository.Update(order);
                await this._orderRepository.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task SetOrderPaidAsync(int orderId)
        {
            if (orderId <= 0)
            {
                throw new ArgumentNullException("Order id must be greater than 0");
            }

            try
            {
                Order order = await this._orderRepository
                    .GetAll()
                    .AsNoTracking()
                    .FirstOrDefaultAsync(o => o.OrderId == orderId);

                order.Status = DeliveryStatus.Paid;
                order.UpdatedOn = DateTimeOffset.UtcNow;

                this._orderRepository.Update(order);
                await this._orderRepository.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task SetOrderReturnedAsync(int orderId)
        {
            if (orderId <= 0)
            {
                throw new ArgumentNullException("Order id must be greater than 0");
            }

            try
            {
                Order order = await this._orderRepository
                    .GetAll()
                    .AsNoTracking()
                    .FirstOrDefaultAsync(o => o.OrderId == orderId);

                order.Status = DeliveryStatus.Returned;
                order.UpdatedOn = DateTimeOffset.UtcNow;

                this._orderRepository.Update(order);
                await this._orderRepository.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }
    }
}
