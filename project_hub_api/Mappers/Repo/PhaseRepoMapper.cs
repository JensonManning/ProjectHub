using project_hub_api.Dtos.Repo;
using project_hub_api.Models.Repo;

namespace project_hub_api.Mappers.Repo
{
    public static class PhaseRepoMapper
    {
        public static PhaseRepoDto ToPhaseRepoDto(this PhaseRepo phaseRepo) 
        {
            return new PhaseRepoDto
            {
                Id = phaseRepo.Id,
                Name = phaseRepo.Name,
                Description = phaseRepo.Description,
                Order = phaseRepo.Order
            };
        }

        public static PhaseRepo ToPhaseRepoCreateDto(this PhaseRepoCreateDto phaseRepoCreateDto)
        {
            return new PhaseRepo
            {
                Name = phaseRepoCreateDto.Name,
                Description = phaseRepoCreateDto.Description,
                Order = phaseRepoCreateDto.Order
            };
        }
        public static PhaseRepo ToPhaseRepoUpdateDto(this PhaseRepoUpdateDto phaseRepoUpdateDto) 
        {
            return new PhaseRepo
            {
                Name = phaseRepoUpdateDto.Name,
                Description = phaseRepoUpdateDto.Description,
                Order = phaseRepoUpdateDto.Order
            };
        }
    }
}
