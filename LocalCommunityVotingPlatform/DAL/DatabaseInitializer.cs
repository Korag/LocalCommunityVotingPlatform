﻿using LocalCommunityVotingPlatform.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalCommunityVotingPlatform.DAL
{
    public class DatabaseInitializer
    {
        public static void SeedUsers(UserManager<User> userManager)
        {
            if (userManager.FindByEmailAsync("vertisio.com@gmail.com").Result == null)
            {
                User user = new User
                {
                    FirstName = "Seed",
                    LastName = "Admin",
                    Email = "vertisio.com@gmail.com",
                    UserName = "vertisio.com@gmail.com"
                };

                var result = userManager.CreateAsync(user, "Qwer!234").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Admin").Wait();
                }
            }
        }
    }
}
