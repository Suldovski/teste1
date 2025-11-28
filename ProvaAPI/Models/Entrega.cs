namespace ProvaAPI.Models;

public class Entrega
{
    public int Id { get; set; }
    public string Produto { get; set; } = null!;
    public string Endereco { get; set; } = null!;
    public string Status { get; set; } = null!;
}
