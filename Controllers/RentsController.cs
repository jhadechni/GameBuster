using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GameBuster.DBContext;
using GameBuster.Models;
using AutoMapper;
using GameBuster.DTOs;

namespace GameBuster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class RentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public RentsController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// Return all rents
        /// </summary>
        /// <returns>All rents</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/Rents
        /// </remarks>
        /// <response code="200">Returns all rents</response>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RentDTO>>> GetRents()
        {
            var results = await _context.Rents.ToListAsync();
            return Ok(_mapper.Map<List<RentDTO>>(results));
        }

        /// <summary>
        /// Return a rent by its id
        /// </summary>
        /// <param name="id">Id of the rent</param>
        /// <returns>a rent</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/Rents/5
        /// </remarks>
        /// <response code="200">Returns the rent</response>
        /// <response code="404">If the rent was not found</response>
        [HttpGet("{id}")]
        public async Task<ActionResult<RentDTO>> GetRent(int id)
        {
            var rent = await _context.Rents.FindAsync(id);

            if (rent == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<RentDTO>(rent));
        }

        /// <summary>
        /// Return all daily rents
        /// </summary>
        /// <returns>All daily rents</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/Rents/DailyRents
        /// </remarks>
        /// <response code="200">Returns all daily rents</response>
        [HttpGet("DailyRents")]
        public async Task<ActionResult<IEnumerable<RentDTO>>> GetDailyRents()
        { 
            var rents = await _context.Rents.Where(r => EF.Functions.DateDiffDay(r.StartDate , DateTime.Now) == 0).ToListAsync();

            if (rents == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<List<RentDTO>>(rents));
        }

        /// <summary>
        /// Update the given rent by its id
        /// </summary>
        /// <returns></returns>
        /// <remarks>
        /// <param name="id">Rent id</param>
        /// <param name="newRent">Rent info</param>
        /// Sample request
        /// PUT: api/Rents/5
        /// </remarks>
        /// <response code="204">Rent uptaded sucefully </response>
        /// <response code="400">If any rent was sended </response>
        /// <response code="404">If the rent was not found</response>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRent(int id, RentDTO newRent)
        {
            var rent = _mapper.Map<Rent>(newRent);

            if (id != rent.RentId)
            {
                return BadRequest();
            }

            _context.Entry(rent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentExists(id))
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

        /// <summary>
        /// Create the given rent
        /// </summary>
        /// <remarks>
        /// <param name="newRent">Rent info</param>
        /// Sample request
        /// POST: api/Rents
        /// </remarks>
        /// <response code="200"> Rent created </response>
        [HttpPost]
        public async Task<ActionResult<RentDTO>> PostRent(RentDTO newRent)
        {
            var rent = _mapper.Map<Rent>(newRent);
            _context.Rents.Add(rent);
            await _context.SaveChangesAsync();
            newRent.RentId = rent.RentId;

            return CreatedAtAction("GetRent", new { id = rent.RentId }, rent);
        }

        /// <summary>
        /// Delete a Rent by its id
        /// </summary>
        /// <remarks>
        /// <param name="id">Rent id</param>
        /// Sample request
        /// DELETE: api/Rents/5
        /// </remarks>
        /// <response code="204">Rent deleted</response>
        /// <response code="404">If the rent was not found</response>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRent(int id)
        {
            var rent = await _context.Rents.FindAsync(id);
            if (rent == null)
            {
                return NotFound();
            }

            _context.Rents.Remove(rent);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RentExists(int id)
        {
            return _context.Rents.Any(e => e.RentId == id);
        }
    }
}
