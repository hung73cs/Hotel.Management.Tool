using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models.Parameter;
using System;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Presentation.Mappers
{
    public class ParameterMapper : IParameterMapper
    {
        public ParameterModel MapParameterToParameterModel(Parameter parameter)
        {
            var parameterModel = new ParameterModel
            {
                Id = parameter.Id,
                Name = parameter.Name,
                Value = parameter.Value
            };
            return parameterModel;
        }
        public Parameter MapParameterModelToParameter(ParameterModel parameterModel)
        {
            var parameter = new Parameter
            {
                Id = Guid.NewGuid(),
                Name = parameterModel.Name,
                Value = parameterModel.Value
            };
            return parameter;
        }

        public Parameter MapParameterModelToParameter(ParameterModel parameterModel, Parameter parameter)
        {
            parameter.Name = parameterModel.Name;
            parameter.Value = parameterModel.Value;

            return parameter;
        }

        public List<ParameterModel> MapParameterToParameterModel(List<Parameter> parameters)
        {
            var parameterModels = new List<ParameterModel>();
            foreach (var i in parameters)
            {
                var parameterModel = new ParameterModel
                {
                    Id = i.Id,
                    Name = i.Name,
                    Value = i.Value
                };
                parameterModels.Add(parameterModel);
            }
            return parameterModels;
        }
    }
}
