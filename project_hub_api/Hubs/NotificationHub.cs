using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace project_hub_api.Hubs
{
    public class NotificationHub : Hub
    {
        public async Task SendNotification(string userId, string message, string type)
        {
            await Clients.User(userId).SendAsync("ReceiveNotification", message, type);
        }
        
        public async Task SendGroupNotification(string groupName, string message, string type)
        {
            await Clients.Group(groupName).SendAsync("ReceiveNotification", message, type);
        }
    }
}