using Hotel.Management.Tool.ApplicationLogic;
using Hotel.Management.Tool.ApplicationLogic.User;
using Hotel.Management.Tool.Core.Configuration;
using Hotel.Management.Tool.Core.Database;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Core.Interfaces.Authentication;
using Hotel.Management.Tool.Presentation.Mappers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Hotel.Management.Tool.Startup
{
    public static class ApplicationServicesExtensions
    {
        public static void AddApplicationServices(
            this IServiceCollection services,
            IConfiguration configuration,
            out IEnvironmentSettings environmentSettings)
        {
            services.UseConfigurationValidation();
            services.ConfigureValidatableSetting<EnvironmentSettings>(configuration);
            services.AddLogging(loggingBuilder => loggingBuilder.AddConsole());

            var serviceProvider = services.BuildServiceProvider();
            var environmentSettingsInner = serviceProvider.GetService<EnvironmentSettings>();

            //
            //Application Logic
            services.AddTransient<IAccountService, AccountService>();
            services.AddTransient<IAuthenticationService, AuthenticationService>();
            services.AddTransient<IRoomTypeService, RoomTypeService>();
            services.AddTransient<IRoomService, RoomService>();
            services.AddTransient<IBookingService, BookingService>();
            services.AddTransient<IGuestTypeService, GuestTypeService>();
            services.AddTransient<IParameterService, ParameterService>();
            services.AddTransient<ISurchargeRateService, SurchargeRateService>();
            services.AddTransient<IBillService, BillService>();
            services.AddTransient<IReportService, ReportService>();


            //Mapper
            services.AddTransient<IAccountMapper, AccountMapper>();
            services.AddTransient<IRoomTypeMapper, RoomTypeMapper>();
            services.AddTransient<IRoomMapper, RoomMapper>();
            services.AddTransient<IEnumMapper, EnumMapper>();
            services.AddTransient<IBookingMapper, BookingMapper>();
            services.AddTransient<IGuestTypeMapper, GuestTypeMapper>();
            services.AddTransient<IParameterMapper, ParameterMapper>();
            services.AddTransient<IBillMapper, BillMapper>();
            services.AddTransient<ISurchargeRateMapper, SurchargeRateMapper>();
            services.AddTransient<IReportMapper, ReportMapper>();


            //Repository
            services.AddTransient<IUserInfoRepository, UserInfoRepository>();
            services.AddTransient<IAccountRepository, AccountRepository>();
            services.AddTransient<IAuthenticationRepository, AuthenticationRepository>();
            services.AddTransient<IRoomRepository, RoomRepository>();
            services.AddTransient<IRoomTypeRepository, RoomTypeRepository>();
            services.AddTransient<IBookingRepository, BookingRepository>();
            services.AddTransient<IGuestTypeRepository, GuestTypeRepository>();
            services.AddTransient<IParameterRepository, ParameterRepository>();
            services.AddTransient<ISurchargeRateRepository, SurchargeRateRepository>();
            services.AddTransient<IBillRepository, BillRepository>();
            services.AddTransient<IBookingDetailRepository, BookingDetailRepository>();
            services.AddTransient<IReportRepository, ReportRepository>();

            //
            services.AddHttpClient();
            environmentSettings = environmentSettingsInner;
        }
    }
}
