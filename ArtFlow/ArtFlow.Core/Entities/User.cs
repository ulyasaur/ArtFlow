using ArtFlow.Core.Abstractions;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.Core.Entities
{
    public class User : IdentityUser, IBaseEntity
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public List<Exhibition> Exhibitions { get; set; }

        public List<Artpiece> Artpieces { get; set; }

        public List<Order> SellOrders { get; set; }

        public List<Order> DeliveryOrders { get; set; }

        public List<Order> DriveOrders { get; set; }
    }
}
