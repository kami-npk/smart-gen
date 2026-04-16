public class CompanyData
{
    public string CustomerName { get; set; }
    public byte[] Image { get; set; }
    public List<ProductItem> Products { get; set; } = new List<ProductItem>();
}

public class ProductItem
{
    public string ProductCode { get; set; }
    public string ProductName { get; set; }
    public string WorkflowPath { get; set; }
}