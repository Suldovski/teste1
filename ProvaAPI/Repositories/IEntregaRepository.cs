using ProvaAPI.Models;

namespace ProvaAPI.Repositories;

public interface IEntregaRepository
{
    Task<Entrega> AddAsync(Entrega entrega);
    Task<IEnumerable<Entrega>> ListAllAsync();
    Task<IEnumerable<Entrega>> ListPendentesAsync();
    Task<IEnumerable<Entrega>> ListConcluidasAsync();
    Task<Entrega?> GetByIdAsync(int id);
    Task<bool> AdvanceStatusAsync(int id);
}
