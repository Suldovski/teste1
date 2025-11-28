using Microsoft.EntityFrameworkCore;
using ProvaAPI.Data;
using ProvaAPI.Models;

namespace ProvaAPI.Repositories;

public class EntregaRepository : IEntregaRepository
{
    private readonly AppDbContext _ctx;

    public EntregaRepository(AppDbContext ctx)
    {
        _ctx = ctx;
    }

    public async Task<Entrega> AddAsync(Entrega entrega)
    {
        entrega.Status = "Pendente";
        _ctx.Entregas.Add(entrega);
        await _ctx.SaveChangesAsync();
        return entrega;
    }

    public async Task<IEnumerable<Entrega>> ListAllAsync()
    {
        return await _ctx.Entregas.AsNoTracking().OrderBy(e => e.Id).ToListAsync();
    }

    public async Task<IEnumerable<Entrega>> ListPendentesAsync()
    {
        return await _ctx.Entregas.AsNoTracking()
            .Where(e => e.Status == "Pendente" || e.Status == "Em Rota")
            .OrderBy(e => e.Id)
            .ToListAsync();
    }

    public async Task<IEnumerable<Entrega>> ListConcluidasAsync()
    {
        return await _ctx.Entregas.AsNoTracking()
            .Where(e => e.Status == "Entregue")
            .OrderBy(e => e.Id)
            .ToListAsync();
    }

    public async Task<Entrega?> GetByIdAsync(int id)
    {
        return await _ctx.Entregas.FindAsync(id);
    }

    public async Task<bool> AdvanceStatusAsync(int id)
    {
        var entrega = await _ctx.Entregas.FindAsync(id);
        if (entrega == null) return false;

        if (entrega.Status == "Pendente") entrega.Status = "Em Rota";
        else if (entrega.Status == "Em Rota") entrega.Status = "Entregue";
        else return true; // já entregue

        await _ctx.SaveChangesAsync();
        return true;
    }
}
