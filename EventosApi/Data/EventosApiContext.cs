using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ApiEventos.Models;

namespace EventosApi.Data
{
    public class EventosApiContext : DbContext
    {
        public EventosApiContext (DbContextOptions<EventosApiContext> options)
            : base(options)
        {
        }

        public DbSet<ApiEventos.Models.Evento> Evento { get; set; }
    }
}
