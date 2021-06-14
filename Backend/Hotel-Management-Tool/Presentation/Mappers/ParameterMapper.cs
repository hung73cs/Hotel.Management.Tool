using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models.Parameter;

namespace Hotel.Management.Tool.Presentation.Mappers
{
    public class ParameterMapper : IParameterMapper
    {        
        public ParameterMapper(IParameterRepository parameterRepository)
        {
            _parameterRepository = parameterRepository;
        }
        
        public ParameterModel MapParameterToParameterModel(Parameter parameter)
        {
            var parameterModel = new ParameterModel
            {
                Name = parameter.Name,
                Value = parameter.Value
            };
            return parameterModel;
        }
        public Parameter MapParameterModelToParameter(ParameterModel parameterModel)
        {
            var parameter = new Parameter
            {
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
    }
}
