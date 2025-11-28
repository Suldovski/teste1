using Microsoft.EntityFrameworkCore;
using ProvaAPI.Data;
using ProvaAPI.Models;
using ProvaAPI.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var dbPath = Path.Combine(AppContext.BaseDirectory, "DB_LuanSuldovski.db");
var connection = $"Data Source={dbPath}";
builder.Services.AddDbContext<AppDbContext>(opts => opts.UseSqlite(connection));
builder.Services.AddScoped<IEntregaRepository, EntregaRepository>();

var app = builder.Build();

app.UseCors();

// Ensure database created
using (var scope = app.Services.CreateScope())
{
	var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
	db.Database.EnsureCreated();
}

app.MapGet("/", () => Results.Ok("ProvaAPI - Entregas"));

app.MapPost("/api/entrega/cadastrar", async (IEntregaRepository repo, Entrega entrega) =>
{
	// Ignore incoming status; repository will set to Pendente
	var created = await repo.AddAsync(new Entrega { Produto = entrega.Produto, Endereco = entrega.Endereco });
	return Results.Created($"/api/entrega/{created.Id}", created);
});

app.MapGet("/api/entrega/listar", async (IEntregaRepository repo) =>
{
	var list = await repo.ListAllAsync();
	return Results.Ok(list);
});

app.MapPatch("/api/entrega/alterar", async (IEntregaRepository repo, IdRequest req) =>
{
	if (req == null || req.Id <= 0) return Results.BadRequest();
	var exists = await repo.GetByIdAsync(req.Id);
	if (exists == null) return Results.NotFound();
	await repo.AdvanceStatusAsync(req.Id);
	var updated = await repo.GetByIdAsync(req.Id);
	return Results.Ok(updated);
});

app.MapGet("/api/entrega/pendentes", async (IEntregaRepository repo) =>
{
	var list = await repo.ListPendentesAsync();
	return Results.Ok(list);
});

app.MapGet("/api/entrega/concluidas", async (IEntregaRepository repo) =>
{
	var list = await repo.ListConcluidasAsync();
	return Results.Ok(list);
});

app.Run();

public record IdRequest(int Id);
