using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace project_hub_api.Services
{
    public class ProjectStatusBackgroundService : BackgroundService
    {
        private readonly ILogger<ProjectStatusBackgroundService> _logger;
        private readonly IServiceScopeFactory _scopeFactory;

        public ProjectStatusBackgroundService(
            ILogger<ProjectStatusBackgroundService> logger,
            IServiceScopeFactory scopeFactory)
        {
            _logger = logger;
            _scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Project Status Background Service started");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    // Calculate time until next run (2am)
                    var now = DateTime.Now;
                    var nextRunTime = new DateTime(now.Year, now.Month, now.Day, 2, 0, 0);
                    
                    // If it's already past 2am today, schedule for tomorrow
                    if (now > nextRunTime)
                    {
                        nextRunTime = nextRunTime.AddDays(1);
                    }
                    
                    var delay = nextRunTime - now;
                    _logger.LogInformation($"Next project status check scheduled at: {nextRunTime:yyyy-MM-dd HH:mm:ss} (in {delay.TotalHours:F1} hours)");
                    
                    // Wait until the next scheduled time
                    await Task.Delay(delay, stoppingToken);
                    
                    // Execute the status update
                    _logger.LogInformation("Starting scheduled project status check");
                    await UpdateProjectStatuses(stoppingToken);
                }
                catch (OperationCanceledException)
                {
                    // Graceful shutdown
                    break;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while updating project statuses");
                    
                    // Wait an hour before retry on error
                    await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
                }
            }
            
            _logger.LogInformation("Project Status Background Service stopped");
        }

        private async Task UpdateProjectStatuses(CancellationToken stoppingToken)
        {
            // Create a new scope to resolve scoped services
            using var scope = _scopeFactory.CreateScope();
            
            try
            {
                // Get the ProjectStatusService from the scope
                var statusService = scope.ServiceProvider.GetRequiredService<ProjectStatusService>();
                
                // Update project statuses
                await statusService.UpdateProjectStatuses();
                
                _logger.LogInformation("Project status check completed successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred during project status update");
                throw;
            }
        }
    }
} 