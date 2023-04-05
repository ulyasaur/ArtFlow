using ArtFlow.Core.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.DAL.Photos.Abstractions
{
    public interface IPhotoAccessor
    {
        Task<Photo> AddPhoto(IFormFile file);

        Task<bool> DeletePhoto(string publicId);
    }
}
