using ApiEventos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventosApi.Data
{
    public static class DbSeeder
    {
        public static void SeedDb(EventosApiContext context)
        {
            context.Database.EnsureCreated();
            context.Sala.Add(
                new Sala() { NomeSala = "Sala Cidade Nobre" }
                );
            context.Sala.Add(
                new Sala() { NomeSala = "Sala Horto" }
                );
            context.Sala.Add(
                new Sala() { NomeSala = "Sala Castelo" }
                );
            context.Sala.Add(
                new Sala() { NomeSala = "Sala Bela Vista" }
                );
            context.Sala.Add(
                new Sala() { NomeSala = "Sala Bom Retiro" }
                );
            context.SaveChanges();
        }
    }
}
