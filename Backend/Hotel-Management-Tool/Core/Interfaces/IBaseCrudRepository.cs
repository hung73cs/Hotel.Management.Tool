using Hotel.Management.Tool.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IBaseCrudRepository<T> where T : class
    {
        Task<T> CreateAsync(T item);

        Task<bool> ExistsAsync(Expression<Func<T, bool>> searchExpression);

        Task<int> CountAsync(Expression<Func<T, bool>> searchExpression);

        Task<List<T>> SearchForMultipleItemsAsync(Expression<Func<T, bool>> searchExpression);

        Task<List<T>> SearchForMultipleItemsAsync(Expression<Func<T, bool>> searchExpression, int offset, int limit);

        Task<List<T>> SearchForMultipleItemsAsync<K>(Expression<Func<T, bool>> searchExpression, int offset, int limit,
            Expression<Func<T, K>> sort, SortDirection sortDirection = SortDirection.Ascending);

        Task<T> SearchForSingleItemAsync(
            Expression<Func<T, bool>> searchExpression,
            params Expression<Func<T, object>>[] includes);

        Task<T> UpdateAsync(T item);

        Task<IEnumerable<T>> UpdateItemsAsync(IEnumerable<T> entities);

        Task DeleteAsync(Expression<Func<T, bool>> searchExpression);

        Task<List<T>> GetListByPagingAsync(int pageIndex, int itemPerPage);

        Task<List<T>> GetListAsync();
    }
}
