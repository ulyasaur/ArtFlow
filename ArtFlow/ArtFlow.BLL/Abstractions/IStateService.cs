using ArtFlow.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.BLL.Abstractions
{
    public interface IStateService
    {
        Task<bool> AddStateAsync(State state);

        Task<State> GetLatestStateAsync(int orderId);
    }
}
