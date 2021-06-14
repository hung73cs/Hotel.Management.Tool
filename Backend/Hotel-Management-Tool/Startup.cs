using Hotel.Management.Tool.ApplicationLogic;
using Hotel.Management.Tool.ApplicationLogic.User;
using Hotel.Management.Tool.Core.Database;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Core.Interfaces.Authentication;
using Hotel.Management.Tool.Presentation.Mappers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace Hotel.Management.Tool
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  builder =>
                                  {
                                      builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                                  });
            });

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Hotel", Version = "v1", });
            });

            //Add Authenthication
            services.AddAuthentication(auth =>
            {
                auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            })
                .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:SecretKey"])),
                };
            });

            //Add DbContext
            services.AddEntityFrameworkNpgsql().AddDbContext<AppDbContext>
                (opt => opt.UseNpgsql(Configuration.GetConnectionString("PostgreSQLConection")));

            //Application Logic
            services.AddTransient<IAccountService, AccountService>();
            services.AddTransient<IAuthenticationService, AuthenticationService>();
            services.AddTransient<IRoomTypeService, RoomTypeService>();
            services.AddTransient<IRoomService, RoomService>();
            services.AddTransient<IBookingService, BookingService>();
            services.AddTransient<IGuestTypeService, GuestTypeService>();
            services.AddTransient<IParameterService, ParameterService>();
            services.AddTransient<ISurchargeRateService, SurchargeRateService>();


            //Mapper
            services.AddTransient<IAccountMapper, AccountMapper>();
            services.AddTransient<IRoomTypeMapper, RoomTypeMapper>();
            services.AddTransient<IRoomMapper, RoomMapper>();
            services.AddTransient<IEnumMapper, EnumMapper>();
            services.AddTransient<IBookingMapper, BookingMapper>();
            services.AddTransient<IGuestTypeMapper, GuestTypeMapper>();
            services.AddTransient<IParameterMapper, ParameterMapper>();
            //services.AddTransient<IReportMapper, ReportMapper>();

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

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //Swagger
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "MyHotel");
            });

            app.UseHttpsRedirection();

            app.ConfigExceptionHandler();

            app.UseRouting();
            
            //Add Cors
            app.UseCors(MyAllowSpecificOrigins);

            //Authentication
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            
        }
    }
}
