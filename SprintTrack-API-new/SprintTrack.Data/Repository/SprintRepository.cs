using Dapper;
using SprintTrack.Data.IRepositories;
using SprintTrack.Domain.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using Newtonsoft.Json;


namespace SprintTrack.Data.Repository
{
    public class SprintRepository : ISprintRepository
    {
        private readonly IDbConnection _connection;

        public SprintRepository(IDbConnection connection)
        {
            _connection = connection;
        }
        public Task<Table> deleteSprint(string deleteSprint)
        {
            throw new NotImplementedException();
        }

        public async Task<string> getAllSprint()
        {
            var response = await _connection.QueryFirstOrDefaultAsync<Table>("select * from nxtspt.fn_sprint_list()",
                commandType: CommandType.Text);
            return response.Records;
        } 
     
        public async Task<string> getSprint(string getSprint)
        {
            var query = "SELECT * FROM nxtspt.fn_get_sprint(@v_txt)";

            var response = await _connection.QueryFirstOrDefaultAsync<Table>(
                query, new { v_txt = getSprint }, commandType: CommandType.Text);

            return response.Records;
        }

        public async Task<int> saveSprint(string saveSprint)
        {
            var query = "SELECT * FROM nxtspt.fn_sprints_save(@v_txt)";

            var response = await _connection.QueryFirstOrDefaultAsync<Table>(
                query, new { v_txt = saveSprint }, commandType: CommandType.Text);

            return response.RETURN_VALUE;
        }
        public async Task<string> ListTicket()
        {
            var response = await _connection.QueryFirstOrDefaultAsync<Table>("select * from nxtspt.fn_tickets_list()",
                commandType: CommandType.Text);
            return response.Records;
        }
    }
}
