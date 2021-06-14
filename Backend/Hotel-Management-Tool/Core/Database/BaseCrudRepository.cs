using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Core.Database
{
    public abstract class BaseCrudRepository<Context, T> : IBaseCrudRepository<T>
          where T : class where Context : DbContext
    {
        protected readonly Context _dbContext;

        protected readonly DbSet<T> _dbSet;

        public BaseCrudRepository(Context dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<T>();
        }

        public async Task<T> CreateAsync(T item)
        {
            try
            {
                await _dbSet.AddAsync(item);

                await _dbContext.SaveChangesAsync();

                _dbContext.Entry(item).State = EntityState.Detached;
            }
            catch (Exception ex) when ((ex.InnerException as PostgresException)?.SqlState == PostgresErrorCodes.UniqueViolation)
            {
                throw new ExtendException(ErrorCode.ItemExisted,$"{typeof(T).Name} already exists in database.", ex);
            }
            catch (Exception ex)
            {
                throw new ExtendException("Error creating {item} in database", ex);
            }
            return item;
        }

        public async Task<List<T>> CreateAsync(List<T> items)
        {
            try
            {
                await _dbSet.AddRangeAsync(items);

                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new ExtendException("Error creating {item} in database", ex);
            }

            return items;
        }

        public async Task<T> UpdateAsync(T item)
        {
            try
            {
                _dbSet.Update(item);

                await _dbContext.SaveChangesAsync();

                _dbContext.Entry(item).State = EntityState.Detached;
            }
            catch (Exception ex)
            {
                throw new ExtendException("Error updating item in database", ex);
            }

            return item;
        }

        public async Task<IEnumerable<T>> UpdateItemsAsync(IEnumerable<T> entities)
        {
            try
            {
                var entityList = entities.ToList();

                _dbSet.UpdateRange(entityList);

                await _dbContext.SaveChangesAsync();

                foreach (var item in entityList)
                {
                    _dbContext.Entry(item).State = EntityState.Detached;
                }

                return entityList;
            }
            catch (Exception ex)
            {
                throw new ExtendException($"Error updating {typeof(T).Name}s in database", ex);
            }
        }

        public async Task DeleteAsync(Expression<Func<T, bool>> searchExpression)
        {
            try
            {
                _dbSet.RemoveRange(_dbSet.IgnoreQueryFilters().Where(searchExpression));
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new ExtendException("Error updating item in database", ex);
            }
        }

        public async Task<bool> ExistsAsync(Expression<Func<T, bool>> searchExpression)
        {
            bool exists = await _dbSet.Where(searchExpression).AnyAsync();

            return exists;
        }

        public async Task<int> CountAsync(Expression<Func<T, bool>> searchExpression)
        {
            return searchExpression == null
                ? await _dbSet.CountAsync()
                : await _dbSet.Where(searchExpression).CountAsync();
        }


        public async Task<T> SearchForSingleItemAsync(
                Expression<Func<T, bool>> searchExpression,
                params Expression<Func<T, object>>[] includes)
        {
            try
            {
                var query = _dbSet.Where(searchExpression).AsNoTracking();
                if (includes.Length != 0)
                {
                    query = includes
                        .Aggregate(query, (current, includeProperty) => current.Include(includeProperty));
                }

                return await query.SingleOrDefaultAsync();
            }
            catch (InvalidOperationException iex)
            {
                throw new ExtendException("More than one item meets the search criteria, More than one {item} was found", iex);
            }
            catch (Exception ex)
            {
                throw new ExtendException("An error occurred while reading a single item from the database", ex);
            }
        }

        public async Task<List<T>> SearchForMultipleItemsAsync(Expression<Func<T, bool>> searchExpression)
        {
            try
            {
                if (searchExpression != null)
                {
                    return await _dbSet.Where(searchExpression).AsNoTracking().ToListAsync();
                }

                return await _dbSet.AsNoTracking().ToListAsync();
            }
            catch (Exception ex)
            {
                throw new ExtendException("An error occurred while reading from the database", ex);
            }
        }

        public async Task<List<T>> SearchForMultipleItemsAsync(Expression<Func<T, bool>> searchExpression, int offset,
            int limit)
        {
            List<T> results;

            try
            {
                if (searchExpression != null)
                {
                    results = await _dbSet.Where(searchExpression).Skip(offset).Take(limit).AsNoTracking().ToListAsync();
                }
                else
                {
                    results = await _dbSet.Skip(offset).Take(limit).AsNoTracking().ToListAsync();
                }
            }
            catch (Exception ex)
            {
                throw new ExtendException("An error occurred while reading from the database", ex);
            }

            return results;
        }

        public async Task<List<T>> SearchForMultipleItemsAsync<K>(Expression<Func<T, bool>> searchExpression,
            int offset, int limit, Expression<Func<T, K>> sort, SortDirection sortDirection = SortDirection.Ascending)
        {
            List<T> results;

            try
            {
                if (sortDirection == SortDirection.Ascending)
                {
                    if (searchExpression != null)
                    {
                        results = await _dbSet.Where(searchExpression).OrderBy(sort).Skip(offset).Take(limit)
                            .AsNoTracking().ToListAsync();
                    }
                    else
                    {
                        results = await _dbSet.OrderBy(sort).Skip(offset).Take(limit)
                            .AsNoTracking().ToListAsync();
                    }
                }
                else
                {
                    if (searchExpression != null)
                    {
                        results = await _dbSet.Where(searchExpression).OrderByDescending(sort).Skip(offset)
                            .Take(limit)
                            .AsNoTracking().ToListAsync();
                    }
                    else
                    {
                        results = await _dbSet.OrderByDescending(sort).Skip(offset)
                            .Take(limit)
                            .AsNoTracking().ToListAsync();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ExtendException("An error occurred while reading from the database", ex);
            }
            return results;
        }

        public async Task<List<T>> GetListByPagingAsync(int pageIndex, int itemPerPage)
        {
            try
            {
                var item = await _dbSet.Skip(itemPerPage * pageIndex).Take(itemPerPage).AsNoTracking().ToListAsync();
                if (item == null)
                {
                    throw new Exception("No item, create one.");
                }

                return item;
            }
            catch (Exception )
            {
                throw new ExtendException(ErrorCode.BadRequest, "An error when get list");
            }
        }
    }
}
