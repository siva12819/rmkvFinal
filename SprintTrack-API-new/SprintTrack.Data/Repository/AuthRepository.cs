using SprintTrack.Data.IRepositories;
using SprintTrack.Domain.Models;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;

namespace SprintTrack.Data.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly IDbConnection _connection;

        public AuthRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task<string> getUser(string username)
        {
            var query = "SELECT * FROM nxtspt.fn_get_user(@v_txt)";

            var response = await _connection.QueryFirstOrDefaultAsync<Table>(
                query, new { v_txt = username }, commandType: CommandType.Text);

            return response.Records;
        }
        public async Task<int> createUser(string user, string password)
        {
            var query = "SELECT * FROM nxtspt.fn_get_user(@v_txt,@v_password)";

            var response = await _connection.QueryFirstOrDefaultAsync<Table>(
                query, new { v_txt = user , v_password = password }, commandType: CommandType.Text);

            return response.RETURN_VALUE;
        }
    }
}
