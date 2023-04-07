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
        ApprovedbyOwner,
        Paid,
        ApprovedByDriver,
        InProgress,
        Delivered,
        Declined,
        Cancel,
        Returned
    }
}
