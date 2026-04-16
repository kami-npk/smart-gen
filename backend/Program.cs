var builder = WebApplication.CreateBuilder(args);

// 1. กำหนดนโยบาย CORS
builder.Services.AddCors(options => {
    options.AddPolicy("AllowNextJS",
        policy => policy.WithOrigins("http://localhost:3000") // URL ของ Next.js
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

// 2. เรียกใช้งาน
app.UseCors("AllowNextJS");

app.MapControllers();
app.Run();