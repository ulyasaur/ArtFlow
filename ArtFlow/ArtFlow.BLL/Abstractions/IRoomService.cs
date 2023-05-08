using ArtFlow.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.BLL.Abstractions
{
    public interface IRoomService
    {
        Task<List<Room>> GetExhibitionRoomsAsync(int exhibitionId);

        Task<Room> GetRoomAsync(int roomId);

        Task AddRoomAsync(Room room);

        Task DeleteRoomAsync(int roomId);

        Task AddArtpieceToRoomAsync(int roomId, string artpieceId);

        Task DeleteArtpieceFromRoomAsync(int roomId, string artpieceId);
    }
}
