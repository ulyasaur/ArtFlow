using ArtFlow.DAL;
using ArtFlow.DAL.Abstractions;
using ArtFlow.DAL.Entities;
using ArtFlow.DAL.Photos.Abstractions;
using ArtFlow.DAL.Photos;
using Microsoft.EntityFrameworkCore;
using ArtFlow.BLL.Abstractions;
using ArtFlow.BLL.Services;
using ArtFlow.Core.Entities;
using Microsoft.AspNetCore.Identity;
using ArtFlow.Services.Abstractions;
using ArtFlow.Services;
using ArtFlow.Mapping;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

IConfiguration appConfig = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

builder.Services.AddDbContext<ApplicationContext>(options =>
                options.UseNpgsql(
                    appConfig.GetConnectionString("DefaultConnection")));


builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));

builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IArtpieceService, ArtpieceService>();
builder.Services.AddScoped<IExhibitionService, ExhibitionService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IRoomService, RoomService>();
builder.Services.AddScoped<IStateService, StateService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddScoped<IPhotoAccessor, PhotoAccessor>();
builder.Services.AddScoped<IUserAccessor, UserAccessor>();

builder.Services.Configure<CloudinarySettings>(appConfig.GetSection("Cloudinary"));

builder.Services.AddIdentity<User, IdentityRole>()
    .AddDefaultTokenProviders()
    .AddEntityFrameworkStores<ApplicationContext>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
