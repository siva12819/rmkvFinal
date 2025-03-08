using SprintTrack.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SprintTrack.Data.IRepositories
{
    public interface ISprintRepository
    {
        Task<string> getAllSprint();  
        Task<string> getSprint(string getSprintId);
        Task<int> saveSprint(string saveSprint);
        Task<Table> deleteSprint(string deleteSprint);
        Task<string> ListTicket();
    }
}
