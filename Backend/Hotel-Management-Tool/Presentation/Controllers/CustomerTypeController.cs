using Hotel.Management.Tool.Core.Constants;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models;
using Hotel.Management.Tool.Models.CustomerType;
using Hotel.Management.Tool.Presentation.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Presentation.Controllers
{
    [Authorize]
    [Route("customer-type")]
    public class CustomerTypeController : ControllerBase
    {
        private readonly ICustomerTypeService _customerTypeService;
        private readonly ICustomerTypeMapper _customerTypeMapper;

        public CustomerTypeController(
            ICustomerTypeService customerTypeService,
            ICustomerTypeMapper customerTypeMapper)
        {
            _customerTypeService = customerTypeService;
            _customerTypeMapper = customerTypeMapper;
        }

        [HttpGet]
        [Route("id/{customerTypeId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<CustomerTypeModel>> GetCustomerType(Guid customerTypeId)
        {
            var customerType = await _customerTypeService.GetCustomerTypeAsync(customerTypeId);

            if (customerType == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return Ok(_customerTypeMapper.MapCustomerTypeToCustomerTypeModel(customerType));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> CreateCustomerType([FromBody] CreateCustomerTypeModel customerTypeModel)
        {
            var mapper = _customerTypeMapper.MapCustomerTypeModelToCustomerType(customerTypeModel);

            if (mapper == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.ItemExisted);
            }

            var result = await _customerTypeService.CreateCustomerTypeAsync(mapper);

            Response.AddInfoHeaders(result.Id);

            return NoContent();
        }

        [HttpPut]
        [Route("id/{customerTypeId}")]
        [Authorize(Roles ="Admin")]
        public async Task<ActionResult> UpdateCustomerType(Guid customerTypeId, [FromBody] CreateCustomerTypeModel customerTypeModel)
        {
            var currentCustomerType = await _customerTypeService.GetCustomerTypeAsync(customerTypeId);

            if(currentCustomerType == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }

            var mapper = _customerTypeMapper.MapCustomerTypeModelToCustomerType(customerTypeModel, currentCustomerType);

            if(mapper == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.WrongMapping);
            }

            await _customerTypeService.UpdateCustomerTypeAsync(mapper);

            return NoContent();
        }

        [HttpDelete]
        [Route("id/{customerTypeId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteCustomerType(Guid customerTypeId)
        {
            await _customerTypeService.DeleteCustomerTypeAsync(customerTypeId);

            return NoContent();
        }

        [HttpDelete]
        [Route("id/{customerTypeId}/hard-delete")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> HardDeleteCustomerType(Guid customerTypeId)
        {
            await _customerTypeService.HardDeleteCustomerTypeAsync(customerTypeId);

            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult<List<CustomerTypeModel>>> GetCustomerTypes()
        {
            var customerTypes = await _customerTypeService.GetCustomerTypesAsync();

            if (customerTypes == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return Ok(_customerTypeMapper.MapCustomerTypesToCustomerTypeModels(customerTypes));
        }
    }
}
