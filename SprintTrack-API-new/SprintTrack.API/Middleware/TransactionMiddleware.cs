using System.Data;

namespace SprintTrack.API.Middleware
{
    public class TransactionMiddleware
    {
        private readonly RequestDelegate _next;

        public TransactionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var dbConnection = context.RequestServices.GetRequiredService<IDbConnection>();
            dbConnection.Open(); // Open the connection

            using (var transaction = dbConnection.BeginTransaction())
            {
                try
                {
                    // Store transaction in request services
                    context.Items["Transaction"] = transaction;

                    await _next(context); // Call the next middleware

                    transaction.Commit(); // Commit if successful
                }
                catch
                {
                    transaction.Rollback(); // Rollback on error
                    throw;
                }
                finally
                {
                    dbConnection.Close(); // Close connection
                }
            }
        }
    }
}
