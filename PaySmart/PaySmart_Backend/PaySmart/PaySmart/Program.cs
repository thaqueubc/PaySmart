using Microsoft.Win32;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Dependency Injection (DI) registrations
// Step 1: Register services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
// Add CORS policy to allow requests from the frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularPolicy",
        policy =>
        {
            policy
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin();
        });
});
//Step 2: Build the app
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    // Step 3: Configure middleware
    app.UseSwagger();
    app.UseSwaggerUI();
}
// Step 3: Configure middleware
app.UseHttpsRedirection();
app.UseCors("AngularPolicy");
app.UseAuthorization();

//Step 4: Map endpoints
app.MapControllers();

app.Run();
