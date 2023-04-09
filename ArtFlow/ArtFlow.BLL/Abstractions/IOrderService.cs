using ArtFlow.Core.Entities;
using ArtFlow.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.BLL.Abstractions
{
    public interface IOrderService
    {
        Task<List<Order>> GetExhibitionOrdersAsync(int exhibitionId);

        Task<List<Order>> GetOrganiserOrdersAsync(string organiserId);

        Task<List<Order>> GetOwnerOrdersAsync(string ownerId);

        Task<List<Order>> GetDriverOrdersInProgressAsync(string driverId);

        Task<List<Order>> GetDriverOrdersAvailableAsync();

        Task<Order> GetOrderAsync(int orderId);

        Task AddOrderAsync(Order order);

        Task ApproveOrderByOwnerAsync(int orderId);

        Task SetOrderPaidAsync(int orderId);        

        Task AcceptOrderByDriverAsync(int orderId, string driverId);
        
        Task SetOrderInProgressAsync(int orderId);

        Task SetOrderDeliveredAsync(int orderId);

        Task SetOrderDeclinedAsync(int orderId);

        Task SetOrderCanceledAsync(int orderId);

        Task SetOrderReturnedAsync(int orderId);
    }
}
