﻿using ArtFlow.Core.Abstractions;
using ArtFlow.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.Core.Entities
{
    public class Order : IBaseEntity
    {
        public int OrderId { get; set; }

        public string SellerId { get; set; }

        public User Seller { get; set; }

        public string CustomerId { get; set; }

        public User Customer { get; set; }

        public string DriverId { get; set; }

        public User Driver { get; set; }

        public string Adress { get; set; }

        public DeliveryStatus Status { get; set; }

    }
}
