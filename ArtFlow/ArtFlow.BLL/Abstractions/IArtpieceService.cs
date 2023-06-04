using ArtFlow.BLL.DTOs;
using ArtFlow.Core.Entities;
using Microsoft.AspNetCore.Http;
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

        Task<List<Artpiece>> GetRoomAvailableArtpiecesAsync(int exhibitionId);

        Task<Artpiece> GetArtpieceAsync(string artpieceId);

        Task<Artpiece> AddArtpieceAsync(ArtpieceDto artpieceDto);

        Task<Artpiece> UpdateArtpieceAsync(ArtpieceDto artpieceDto);

        Task<Photo> UpdateArtpiecePictureAsync(string artpieceId, IFormFile file);

        Task DeleteArtpieceAsync(string artpieceId);
    }
}
