using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Dtos.Projects.Tasks;
using project_hub_api.Models.Projects.Tasks;

namespace project_hub_api.Mappers.Projects
{
    public static class ProjectTaskCommentMapper
    {
        public static ProjectTaskCommentDto ToProjectTaskCommentDto(this ProjectTaskComment projectTaskComment)
        {
            return new ProjectTaskCommentDto
            {
                Id = projectTaskComment.Id,
                Content = projectTaskComment.Content,
                CommentBy = projectTaskComment.CommentBy,
                CommentDate = projectTaskComment.CommentDate,
                ProjectTaskId = projectTaskComment.ProjectTaskId,
                ProjectTask = projectTaskComment.ProjectTask?.ToProjectTaskSimpleDto()
            };
        }

        public static ProjectTaskComment ToProjectTaskCommentCreateDto(this ProjectTaskCommentCreateDto projectTaskComment)
        {
            return new ProjectTaskComment
            {
                Content = projectTaskComment.Content,
                CommentBy = projectTaskComment.CommentBy,
                CommentDate = projectTaskComment.CommentDate,
                ProjectTaskId = projectTaskComment.ProjectTaskId
            };
        }

        public static ProjectTaskComment ToProjectTaskCommentUpdateDto(this ProjectTaskCommentUpdateDto projectTaskComment)
        {
            return new ProjectTaskComment
            {
                Content = projectTaskComment.Content,
                CommentBy = projectTaskComment.CommentBy,
                CommentDate = projectTaskComment.CommentDate
            };
        }

        public static ProjectTaskCommentSimpleDto ToProjectTaskCommentSimpleDto(this ProjectTaskComment projectTaskComment)
        {
            return new ProjectTaskCommentSimpleDto
            {
                Id = projectTaskComment.Id,
                Content = projectTaskComment.Content,
                CommentBy = projectTaskComment.CommentBy,
                CommentDate = projectTaskComment.CommentDate
            };
        }
    }
}