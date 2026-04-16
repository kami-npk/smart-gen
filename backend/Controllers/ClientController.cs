[ApiController]
[Route("api/[controller]")]
public class ClientController : ControllerBase {
    private readonly IConfiguration _config;
    public ClientController(IConfiguration config) { _config = config; }

    [HttpGet("{customerCode}")]
    public async Task<IActionResult> GetClient(string customerCode) {
        using var conn = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
        
        // Query ดึงข้อมูล Company และ List Product
        var sql = @"
            SELECT CustomerName, Image FROM MainTypes WHERE CustomerCode = @code;
            SELECT d.ProductCode, d.ProductName, d.WorkflowPath 
            FROM MainTypeDetails d
            JOIN MainTypes m ON d.MainTypeId = m.MainTypeId
            WHERE m.CustomerCode = @code";

        using var multi = await conn.QueryMultipleAsync(sql, new { code = customerCode });
        var company = await multi.ReadFirstAsync<dynamic>();
        var products = await multi.ReadAsync<ProductItem>();

        return Ok(new {
            name = company.CustomerName,
            logo = company.Image != null ? Convert.ToBase64String(company.Image) : null,
            products = products
        });
    }
}