using ArtFlow.Core.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.DAL.Abstractions
{
    public interface IBaseRepository<TEntity> where TEntity : IBaseEntity
    {
        IQueryable<TEntity> GetAll();

        Task<TEntity> FindByIdAsync(params object[] keys);

        Task<TEntity> FindByCondition(Expression<Func<TEntity, bool>> predicate);

        void Add(TEntity entity);

        void Remove(TEntity entity);

        void Update(TEntity entity);

        Task<int> SaveChangesAsync();
    }
}
