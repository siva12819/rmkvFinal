using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SprintTrack.Data.Repository
{
    public class RepositoryBase
    {
        protected IDbTransaction Transaction { get; private set; }
        protected IDbConnection Connection { get { return Transaction.Connection; } }
        public RepositoryBase(IDbTransaction transaction)
        {
            Transaction = transaction;
        }

    }
}
