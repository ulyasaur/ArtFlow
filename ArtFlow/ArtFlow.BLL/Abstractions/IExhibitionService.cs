﻿using ArtFlow.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.BLL.Abstractions
{
    public interface IExhibitionService
    {
        Task<List<Exhibition>> GetUserExhibitionsAsync(string userId);

        Task<Exhibition> GetExhibitionAsync(int exhibitionId);

        Task AddExhibitionAsync(Exhibition exhibition);

        Task UpdateExhibitionAsync(Exhibition exhibition);

        Task DeleteExhibitionAsync(int exhibitionId);
}
    }
