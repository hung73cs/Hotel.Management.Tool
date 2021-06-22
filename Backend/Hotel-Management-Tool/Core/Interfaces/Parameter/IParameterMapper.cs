using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Models.Parameter;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IParameterMapper
    {
        ParameterModel MapParameterToParameterModel(Parameter parameter);
        Parameter MapParameterModelToParameter(ParameterModel parameterModel);
        Parameter MapParameterModelToParameter(ParameterModel parameterModel, Parameter parameterEntity);

    }
}
