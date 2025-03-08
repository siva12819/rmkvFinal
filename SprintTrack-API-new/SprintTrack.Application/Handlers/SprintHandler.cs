using MediatR;
using SprintTrack.Application.Services;
using SprintTrack.Data.IRepositories;
using SprintTrack.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SprintTrack.Application.Handlers
{
    public class getAllSprintHandler : IRequestHandler<getAllSprintService, string>
    {
        private readonly ISprintRepository _repository;

        public getAllSprintHandler(ISprintRepository repository)
        {
            _repository = repository;
        }

        public async Task<string> Handle(getAllSprintService request, CancellationToken cancellationToken)
        {
            return await _repository.getAllSprint();
        }
    }  

    public class getSprintHandler : IRequestHandler<getSprintService, string>
    {
        private readonly ISprintRepository _repository;

        public getSprintHandler(ISprintRepository repository)
        {
            _repository = repository;
        }

        public async Task<string> Handle(getSprintService request, CancellationToken cancellationToken)
        {
            return await _repository.getSprint(request.getSprintId);
        }
    }
    public class saveSprintHandler : IRequestHandler<saveSprintService, int>
    {
        private readonly ISprintRepository _repository;

        public saveSprintHandler(ISprintRepository repository)
        {
            _repository = repository;
        }

        public async Task<int> Handle(saveSprintService request, CancellationToken cancellationToken)
        {
            return await _repository.saveSprint(request.saveSprint);
        }
    }

    public class ListTicketHandler : IRequestHandler<ListTicketService, string>
    {
        private readonly ISprintRepository _repository;

        public ListTicketHandler(ISprintRepository repository)
        {
            _repository = repository;
        }

        public async Task<string> Handle(ListTicketService request, CancellationToken cancellationToken)
        {
            return await _repository.ListTicket();
        }
    }
}
