using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Dtos.Repo;
using PH_API.Models.Repo;
using PH_API.Mappers.Repo;

namespace PH_API.Mappers.Repo
{
    public static class CategoryRepoMapper
    {
        public static CategoryRepoDto ToCategoryRepoDto(this CategoryRepo categoryRepo) 
        {
            return new CategoryRepoDto
            {
                Id = categoryRepo.Id,
                Name = categoryRepo.Name,
                Description = categoryRepo.Description,
                TaskRepo = categoryRepo.TaskRepo?.Select(x => TaskRepoMapper.ToTaskRepoDto(x)).ToList()
            };
        }

        public static CategoryRepo ToCategoryRepoCreateDto(this CategoryRepoCreateDto categoryRepoCreateDto)        
        {
            return new CategoryRepo 
            {
                Name = categoryRepoCreateDto.Name,
                Description = categoryRepoCreateDto.Description
            };
        }

        public static CategoryRepo ToCategoryRepoUpdateDto(this CategoryRepoUpdateDto categoryRepoUpdateDto)        
        {
            return new CategoryRepo 
            {
                Name = categoryRepoUpdateDto.Name,
                Description = categoryRepoUpdateDto.Description
            };
        }

        public static CategoryRepoSimpleDto ToCategoryRepoSimpleDto(this CategoryRepo categoryRepo)
        {
            return new CategoryRepoSimpleDto
            {
                Id = categoryRepo.Id,
                Name = categoryRepo.Name
            };
        }
    }
}