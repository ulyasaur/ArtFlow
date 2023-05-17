using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.Core.Enums
{
    public enum DeliveryStatus
    {
        Registered,
        ApprovedByOwner,
        //Paid,
        ApprovedByDriver,
        InProgress,
        Delivered,
        Declined,
        Canceled,
        Returned
    }
}
