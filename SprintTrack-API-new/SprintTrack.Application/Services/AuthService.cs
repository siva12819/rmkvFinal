using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SprintTrack.Application.Services
{
    public class getUserService : IRequest<string>
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
