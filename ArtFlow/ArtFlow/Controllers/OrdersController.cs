using ArtFlow.BLL.Abstractions;
using ArtFlow.Core.Entities;
using ArtFlow.Core.Enums;
using ArtFlow.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArtFlow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IStateService _stateService;
        private readonly IMapper _mapper;
        private readonly ILogger<OrdersController> _logger;

        public OrdersController(IOrderService orderService, 
            IStateService stateService, 
            IMapper mapper, 
            ILogger<OrdersController> logger)
        {
            _orderService = orderService;
            _stateService = stateService;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet("exhibition/{exhibitionId}")]
        public async Task<IActionResult> GetExhibitionOrdersAsync(int exhibitionId)
        {
            try
            {
                List<Order> orders = await this._orderService.GetExhibitionOrdersAsync(exhibitionId);

                List<OrderViewModel> orderViewModels = new List<OrderViewModel>();
                this._mapper.Map(orders, orderViewModels);

                foreach (var orderViewModel in orderViewModels)
                {
                    State state = await this._stateService.GetLatestStateAsync(orderViewModel.OrderId);
                    orderViewModel.LatestState = new StateViewModel();
                    this._mapper.Map(state, orderViewModel.LatestState);

                    orderViewModel.isStateOk = await this._stateService.CheckLatestStateAsync(orderViewModel.OrderId);
                }

                return Ok(orderViewModels);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("organiser/{organiserId}")]
        public async Task<IActionResult> GetOrganiserOrdersAsync(string organiserId)
        {
            try
            {
                List<Order> orders = await this._orderService.GetOrganiserOrdersAsync(organiserId);

                List<OrderViewModel> orderViewModels = new List<OrderViewModel>();
                this._mapper.Map(orders, orderViewModels);

                foreach (var orderViewModel in orderViewModels)
                {
                    State state = await this._stateService.GetLatestStateAsync(orderViewModel.OrderId);
                    orderViewModel.LatestState = new StateViewModel();
                    this._mapper.Map(state, orderViewModel.LatestState);

                    orderViewModel.isStateOk = await this._stateService.CheckLatestStateAsync(orderViewModel.OrderId);
                }

                return Ok(orderViewModels);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("owner/{ownerId}")]
        public async Task<IActionResult> GetOwnerOrdersAsync(string ownerId)
        {
            try
            {
                List<Order> orders = await this._orderService.GetOwnerOrdersAsync(ownerId);

                List<OrderViewModel> orderViewModels = new List<OrderViewModel>();
                this._mapper.Map(orders, orderViewModels);

                foreach (var orderViewModel in orderViewModels)
                {
                    State state = await this._stateService.GetLatestStateAsync(orderViewModel.OrderId);
                    orderViewModel.LatestState = new StateViewModel();
                    this._mapper.Map(state, orderViewModel.LatestState);

                    orderViewModel.isStateOk = await this._stateService.CheckLatestStateAsync(orderViewModel.OrderId);
                }

                return Ok(orderViewModels);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("driver/{driverId}")]
        public async Task<IActionResult> GetDriverOrdersInProgressAsync(string driverId)
        {
            try
            {
                List<Order> orders = await this._orderService.GetDriverOrdersInProgressAsync(driverId);

                List<OrderViewModel> orderViewModels = new List<OrderViewModel>();
                this._mapper.Map(orders, orderViewModels);

                foreach (var orderViewModel in orderViewModels)
                {
                    State state = await this._stateService.GetLatestStateAsync(orderViewModel.OrderId);
                    orderViewModel.LatestState = new StateViewModel();
                    this._mapper.Map(state, orderViewModel.LatestState);

                    orderViewModel.isStateOk = await this._stateService.CheckLatestStateAsync(orderViewModel.OrderId);
                }

                return Ok(orderViewModels);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("driver")]
        public async Task<IActionResult> GetDriverOrdersAvailableAsync()
        {
            try
            {
                List<Order> orders = await this._orderService.GetDriverOrdersAvailableAsync();

                List<OrderViewModel> orderViewModels = new List<OrderViewModel>();
                this._mapper.Map(orders, orderViewModels);

                return Ok(orderViewModels);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetOrderAsync(int orderId)
        {
            try
            {
                Order order = await this._orderService.GetOrderAsync(orderId);

                OrderViewModel orderViewModel = new OrderViewModel();
                this._mapper.Map(order, orderViewModel);

                return Ok(orderViewModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddOrderAsync(OrderAddViewModel orderAddViewModel)
        {
            try
            {
                Order order = new Order();
                this._mapper.Map(orderAddViewModel, order);

                order.Status = DeliveryStatus.Registered;
                order.UpdatedOn = DateTimeOffset.UtcNow;

                await this._orderService.AddOrderAsync(order);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{orderId}/approve")]
        public async Task<IActionResult> ApproveOrderByOwnerAsync(int orderId)
        {
            try
            {
                await this._orderService.ApproveOrderByOwnerAsync(orderId);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{orderId}/pay")]
        public async Task<IActionResult> SetOrderPaidAsync(int orderId)
        {
            try
            {
                await this._orderService.SetOrderPaidAsync(orderId);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{orderId}/{driverId}/accept")]
        public async Task<IActionResult> AcceptOrderByDriverAsync(int orderId, string driverId)
        {
            try
            {
                await this._orderService.AcceptOrderByDriverAsync(orderId, driverId);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{orderId}/progress")]
        public async Task<IActionResult> SetOrderInProgressAsync(int orderId)
        {
            try
            {
                await this._orderService.SetOrderInProgressAsync(orderId);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{orderId}/deliver")]
        public async Task<IActionResult> SetOrderDeliveredAsync(int orderId)
        {
            try
            {
                await this._orderService.SetOrderDeliveredAsync(orderId);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{orderId}/decline")]
        public async Task<IActionResult> SetOrderDeclinedAsync(int orderId)
        {
            try
            {
                await this._orderService.SetOrderDeclinedAsync(orderId);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{orderId}/cancel")]
        public async Task<IActionResult> SetOrderCanceledAsync(int orderId)
        {
            try
            {
                await this._orderService.SetOrderCanceledAsync(orderId);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{orderId}/return")]
        public async Task<IActionResult> SetOrderReturnedAsync(int orderId)
        {
            try
            {
                await this._orderService.SetOrderReturnedAsync(orderId);

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
