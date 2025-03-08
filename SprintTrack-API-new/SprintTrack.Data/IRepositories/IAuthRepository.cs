using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SprintTrack.Data.IRepositories
{
    public interface IAuthRepository
    {
        Task<string> getUser(string username);
        Task<int> createUser(string user,string password);
    }
}
