using ArtFlow.BLL.DTOs;
using ArtFlow.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.BLL.Abstractions
{
    public interface IArtpieceService
    {
        Task<List<Artpiece>> GetAvailableArtpiecesAsync();

        Task<List<Artpiece>> GetOwnerArtpiecesAsync(string ownerId);

        Task<List<Artpiece>> GetExhibitionArtpiecesAsync(int exhibitionId);

        Task<List<Artpiece>> GetRoomArtpiecesAsync(int roomId);

        Task<Artpiece> GetArtpieceAsync(string artpieceId);

        Task AddArtpieceAsync(ArtpieceDto artpieceDto);

        Task UpdateArtpieceAsync(ArtpieceDto artpieceDto);

        Task DeleteArtpieceAsync(string artpieceId);
    }
}
