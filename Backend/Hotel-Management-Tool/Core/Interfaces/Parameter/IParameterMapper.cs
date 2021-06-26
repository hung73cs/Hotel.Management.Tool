using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Models.Parameter;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IParameterMapper
    {
        ParameterModel MapParameterToParameterModel(Parameter parameter);
        List<ParameterModel> MapParameterToParameterModel(List<Parameter> parameters);
        Parameter MapParameterModelToParameter(ParameterModel parameterModel);
        Parameter MapParameterModelToParameter(ParameterModel parameterModel, Parameter parameterEntity);

    }
}
