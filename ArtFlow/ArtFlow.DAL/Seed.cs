using ArtFlow.Core.Entities;
using ArtFlow.Core.Enums;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.DAL
{
    public class Seed
    {
        public static async Task SeedData(ApplicationContext context,
            UserManager<User> userManager)
        {
            var users = new List<User>
            {
                new User
                {
                    Id = "ad183560-7a60-4a72-ad86-cdc908f24d6b",
                    FirstName = "Bob",
                    LastName = "Bobber",
                    UserName = "bob",
                    Email = "bob@test.com"
                },
                new User
                {
                    Id = "c2ca5621-991c-48ed-bec3-b96441fa41da",
                    FirstName = "Jane",
                    LastName = "Janeritte",
                    UserName = "jane",
                    Email = "jane@test.com"
                },
                new User
                {
                    Id = "1a5d153d-095f-43e9-8e7b-f9d5f7f47fd4",
                    FirstName = "Tom",
                    LastName = "Tompson",
                    UserName = "tom",
                    Email = "tom@test.com"
                },
                new User
                {
                    Id = "d7857ddd-8da9-43e7-bc2e-0d590e0b9717",
                    FirstName = "Ryan",
                    LastName = "Gosling",
                    UserName = "ken",
                    Email = "kenenergy@test.com"
                },
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole() { Id = "fab4fac1-c546-41de-aebc-a14da6895711", Name = "Driver", ConcurrencyStamp = "1", NormalizedName = "DRIVER" },
                new IdentityRole() { Id = "c7b013f0-5201-4317-abd8-c211f91b7330", Name = "Organiser", ConcurrencyStamp = "2", NormalizedName = "ORGANISER" },
                new IdentityRole() { Id = "ee80df5e-b172-4943-b968-643b028f1b7d", Name = "ArtOwner", ConcurrencyStamp = "3", NormalizedName = "ARTOWNER" },
            };

            context.Roles.AddRange(roles);

            List<IdentityUserRole<string>> identityUserRoles = new List<IdentityUserRole<string>>
            {
                new IdentityUserRole<string>
                {
                    UserId = "ad183560-7a60-4a72-ad86-cdc908f24d6b",
                    RoleId = "c7b013f0-5201-4317-abd8-c211f91b7330"
                },
                new IdentityUserRole<string>
                {
                    UserId = "c2ca5621-991c-48ed-bec3-b96441fa41da",
                    RoleId = "ee80df5e-b172-4943-b968-643b028f1b7d"
                },
                new IdentityUserRole<string>
                {
                    UserId = "1a5d153d-095f-43e9-8e7b-f9d5f7f47fd4",
                    RoleId = "ee80df5e-b172-4943-b968-643b028f1b7d"
                },
                new IdentityUserRole<string>
                {
                    UserId = "d7857ddd-8da9-43e7-bc2e-0d590e0b9717",
                    RoleId = "fab4fac1-c546-41de-aebc-a14da6895711"
                },
            };

            context.UserRoles.AddRange(identityUserRoles);

            List<Artpiece> artpieces = new List<Artpiece>()
            {
                new Artpiece()
                {
                    ArtpieceId = "333DFCB6",
                    Name = "Test1",
                    Description = "test test",
                    AuthorName = "Test Author",
                    OwnerId = "c2ca5621-991c-48ed-bec3-b96441fa41da",
                    KeepRecommendation = new KeepRecommendation()
                    {
                        MinTemperature = 10,
                        MaxTemperature = 20,
                        MinHumidity = 30,
                        MaxHumidity = 60,
                        MinLight = 10,
                        MaxLight = 80
                    }
                },
                new Artpiece()
                {
                    ArtpieceId = "33E21A10",
                    Name = "Test2",
                    Description = "test test",
                    AuthorName = "Test Author",
                    OwnerId = "c2ca5621-991c-48ed-bec3-b96441fa41da",
                    KeepRecommendation = new KeepRecommendation()
                    {
                        MinTemperature = 10,
                        MaxTemperature = 20,
                        MinHumidity = 30,
                        MaxHumidity = 60,
                        MinLight = 10,
                        MaxLight = 80
                    }
                }
            };

            context.Artpieces.AddRange(artpieces);

            List<Exhibition> exhibitions = new List<Exhibition>()
            {
                new Exhibition()
                {
                    ExhibitionId = 1,
                    Name = "Test exh",
                    Description = "test test",
                    OrganiserId = "ad183560-7a60-4a72-ad86-cdc908f24d6b",
                    StartDate = DateTimeOffset.UtcNow,
                    EndDate = DateTimeOffset.UtcNow,
                    Adress = "test test test"
                }
            };

            context.Exhibitions.AddRange(exhibitions);

            List<Order> orders = new List<Order>()
            {
                new Order
                {
                    OrderId = 1,
                    SellerId = "c2ca5621-991c-48ed-bec3-b96441fa41da",
                    CustomerId = "ad183560-7a60-4a72-ad86-cdc908f24d6b",
                    DriverId = "d7857ddd-8da9-43e7-bc2e-0d590e0b9717",
                    ArtpieceId = "33E21A10",
                    ExhibitionId = 1,
                    Adress = "Test",
                    Status = DeliveryStatus.ApprovedByDriver,
                    UpdatedOn = DateTimeOffset.UtcNow
                },
                new Order
                {
                    OrderId = 2,
                    SellerId = "c2ca5621-991c-48ed-bec3-b96441fa41da",
                    CustomerId = "ad183560-7a60-4a72-ad86-cdc908f24d6b",
                    DriverId = "d7857ddd-8da9-43e7-bc2e-0d590e0b9717",
                    ArtpieceId = "333DFCB6",
                    ExhibitionId = 1,
                    Adress = "Test",
                    Status = DeliveryStatus.ApprovedByDriver,
                    UpdatedOn = DateTimeOffset.UtcNow
                },
            };

            context.Orders.AddRange(orders);

            await context.SaveChangesAsync();
        }
    }
}
