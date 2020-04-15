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
    [Route("api/[controller]")]
    [ApiController]
    public class SalasController : ControllerBase
    {
        private readonly EventosApiContext _context;
        private readonly IDataRepository<Sala> _repo;

        public SalasController(EventosApiContext context, IDataRepository<Sala> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Salas
        [HttpGet]
        public IEnumerable<Sala> GetEventos()
        {
            return _context.Sala.OrderByDescending(p => p.SalaId);
        }

        // GET: api/Salas/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSala([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sala = await _context.Sala.FindAsync(id);

            if (sala == null)
            {
                return NotFound();
            }

            return Ok(sala);
        }

        // PUT: api/Salas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSala([FromRoute] int id, [FromBody] Sala sala)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sala.SalaId)
            {
                return BadRequest();
            }

            _context.Entry(sala).State = EntityState.Modified;

            try
            {
                _repo.Update(sala);
                var save = await _repo.SaveAsync(sala);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalaExists(id))
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

        // POST: api/Salas
        [HttpPost]
        public async Task<IActionResult> PostSala([FromBody] Sala sala)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repo.Add(sala);
            var save = await _repo.SaveAsync(sala);

            return CreatedAtAction("GetSala", new { id = sala.SalaId }, sala);
        }

        // DELETE: api/Salas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSala([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sala = await _context.Sala.FindAsync(id);
            if (sala == null)
            {
                return NotFound();
            }

            _repo.Delete(sala);
            var save = await _repo.SaveAsync(sala);

            return Ok(sala);
        }

        private bool SalaExists(int id)
        {
            return _context.Sala.Any(e => e.SalaId == id);
        }
    }
}