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
    public class PlatformsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        public PlatformsController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// Return all platforms
        /// </summary>
        /// <returns>All Platforms</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/Platforms
        /// </remarks>
        /// <response code="200">Returns all Platforms</response>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlatformDTO>>> GetPlatforms()
        {
            var results = await _context.Platforms.ToListAsync();
            return Ok(_mapper.Map<List<PlatformDTO>>(results));
        }

        /// <summary>
        /// Return a Platform by its id
        /// </summary>
        /// <param name="id">Id of the Platform</param>
        /// <returns>a Platform</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/Platforms/5
        /// </remarks>
        /// <response code="200">Returns the platform</response>
        /// <response code="404">If the platform was not found</response>
        [HttpGet("{id}")]
        public async Task<ActionResult<PlatformDTO>> GetPlatform(int id)
        {
            var platform = await _context.Platforms.FindAsync(id);

            if (platform == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<PlatformDTO>(platform));
        }

        /// <summary>
        /// Update the given platform by its id
        /// </summary>
        /// <returns></returns>
        /// <remarks>
        /// <param name="id">Platform id</param>
        /// <param name="newPlatform">Platform info</param>
        /// Sample request
        /// PUT: api/Platforms/5
        /// </remarks>
        /// <response code="204">Platform uptaded sucefully </response>
        /// <response code="400">If any platform was sended </response>
        /// <response code="404">If the platform was not found</response>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlatform(int id, PlatformDTO newPlatform)
        {
            var platform = _mapper.Map<Platform>(newPlatform);

            if (id != platform.PlatformId)
            {
                return BadRequest();
            }

            _context.Entry(platform).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlatformExists(id))
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
        /// Create the given Platform
        /// </summary>
        /// <remarks>
        /// <param name="newPlatform">Platform info</param>
        /// Sample request
        /// POST: api/Platforms
        /// </remarks>
        /// <response code="200"> Platform created </response>
        [HttpPost]
        public async Task<ActionResult<PlatformDTO>> PostPlatform(PlatformDTO newPlatform)
        {
            var platform = _mapper.Map<Platform>(newPlatform);
            _context.Platforms.Add(platform);
            await _context.SaveChangesAsync();
            newPlatform.PlatformId = platform.PlatformId;

            return CreatedAtAction("GetPlatform", new { id = platform.PlatformId }, platform);
        }

        /// <summary>
        /// Delete a Platform by its id
        /// </summary>
        /// <remarks>
        /// <param name="id">Platform id</param>
        /// Sample request
        /// DELETE: api/Platforms/5
        /// </remarks>
        /// <response code="204">Platform deleted</response>
        /// <response code="404">If the platform was not found</response>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlatform(int id)
        {
            var platform = await _context.Platforms.FindAsync(id);
            if (platform == null)
            {
                return NotFound();
            }

            _context.Platforms.Remove(platform);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlatformExists(int id)
        {
            return _context.Platforms.Any(e => e.PlatformId == id);
        }
    }
}
