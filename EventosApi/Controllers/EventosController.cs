using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiEventos.Models;
using EventosApi.Data;

namespace EventosApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class EventosController : ControllerBase
    {
        private readonly EventosApiContext _context;
        private readonly IDataRepository<Evento> _repo;

        public EventosController(EventosApiContext context, IDataRepository<Evento> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Evento
        [HttpGet]
        public IEnumerable<Evento> GetEventos()
        {
            return _context.Evento.OrderByDescending(p => p.EventoId);
        }

        // GET: api/Evento/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventos([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var evento = await _context.Evento.FindAsync(id);

            if (evento == null)
            {
                return NotFound();
            }

            return Ok(evento);
        }

        // PUT: api/Evento/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEventos([FromRoute] int id, [FromBody] Evento evento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != evento.EventoId)
            {
                return BadRequest();
            }

            _context.Entry(evento).State = EntityState.Modified;

            try
            {
                _repo.Update(evento);
                var save = await _repo.SaveAsync(evento);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Evento
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<IActionResult> PostEventos([FromBody] Evento evento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repo.Add(evento);
            var save = await _repo.SaveAsync(evento);

            return CreatedAtAction("GetEventos", new { id = evento.EventoId }, evento);
        }

        // DELETE: api/Evento/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEventos([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var evento = await _context.Evento.FindAsync(id);
            if (evento == null)
            {
                return NotFound();
            }

            _repo.Delete(evento);
            var save = await _repo.SaveAsync(evento);

            return Ok(evento);

        }

        private bool EventosExists(int id)
        {
            return _context.Evento.Any(e => e.EventoId == id);
        }
    }
}