using MediatR;
using SprintTrack.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SprintTrack.Application.Services
{
    public class getAllSprintService : IRequest<string>
    {
    } 
    public class getSprintService : IRequest<string>
    {
        public string getSprintId { get; set; }
    }
    public class saveSprintService : IRequest<int>
    {
        public string saveSprint { get; set; }
    }
    public class ListTicketService : IRequest<string>
    {
    }
}
