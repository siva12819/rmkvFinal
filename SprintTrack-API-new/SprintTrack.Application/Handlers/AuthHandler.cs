using MediatR;
using Newtonsoft.Json;
using SprintTrack.Application.Services;
using SprintTrack.Common.CommonMiddleware;
using SprintTrack.Data.IRepositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SprintTrack.Application.Handlers
{
    public class GetUserHandler : IRequestHandler<getUserService, string>
    {
        private readonly IAuthRepository _repository;
        private readonly PasswordService _password;

        public GetUserHandler(IAuthRepository repository,PasswordService password)
        {
            _repository = repository;
            _password = password;
        }

        public async Task<string> Handle(getUserService request, CancellationToken cancellationToken)
        {
            var user = await _repository.getUser(request.Username);

            DataTable userTable = JsonConvert.DeserializeObject<DataTable>(user);
            if (userTable == null || userTable.Rows.Count == 0)
            {
                return JsonConvert.SerializeObject(new { message = "User not found" });
            }

            DataRow userRow = userTable.Rows[0];
            string passwordHash = userRow["password_hash"].ToString();

            bool isPasswordValid = _password.VerifyPassword(passwordHash, request.Password);

            if (!isPasswordValid)
            {
                return JsonConvert.SerializeObject(new { message = "Invalid password" });
            }

            var resultUser = new
            {
                username = request.Username,
                role = userRow["role"].ToString(),
                name = userRow["Name"].ToString(),
                email = userRow["email"].ToString()
            };

            return JsonConvert.SerializeObject(resultUser);
        }
    }
}
