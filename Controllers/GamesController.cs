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
using NuGet.Protocol.Core.Types;

namespace GameBuster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        public GamesController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        // GET: api/Games
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameDTO>>> GetGames()
        {
            var results = await _context.Games.Include(g => g.Platforms).ToListAsync();
            return Ok(_mapper.Map<List<GameDTO>>(results));
        }

        /// <summary>
        /// Return a Game by its id
        /// </summary>
        /// <param name="id">Id of the Game</param>
        /// <returns>a Game</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/Games/5
        /// </remarks>
        /// <response code="200">Returns the Game</response>
        /// <response code="404">If the Game was not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<GameDTO>> GetGame(int id)
        {
            var game = await _context.Games.FindAsync(id);

            if (game == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<GameDTO>(game));
        }

        // GET: api/Customers/GetFrecuentGame
        [HttpGet("GetFrecuentGame")]
        public async Task<ActionResult<GameDTO>> GetFrecuentGame()
        {

            var frecuentGame = await _context.Rents.GroupBy(c => c.GameId, (x, y) => new
            {
                quantity = y.Count(),
                game_id = x,
            }).OrderByDescending(a => a.quantity).FirstOrDefaultAsync();

            if (frecuentGame == null)
            {
                return NotFound();
            }

            var game = await _context.Games.FindAsync(frecuentGame.game_id);

            return Ok(_mapper.Map<GameDTO>(game));
        }

        //GET: api/Game/GetGameWithProducer/?producer=Jaime
        [HttpGet("GetGameWithProducer")]
        public async Task<ActionResult<IEnumerable<GameDTO>>> GetGameWithProducer([FromQuery] string producer)
        {
            if (producer == null)
            {
                return BadRequest();
            }

            var result = await _context.Games.Where(g => g.Producer == producer).ToListAsync();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<List<GameDTO>>(result));
        }

        //GET: api/Game/GetGameWithDirector/?director=Jaime
        [HttpGet("GetGameWithDirector")]
        public async Task<ActionResult<IEnumerable<GameDTO>>> GetGameWithDirector([FromQuery] string director)
        {
            if (director == null)
            {
                return BadRequest();
            }

            var result = await _context.Games.Where(g => g.Director == director).ToListAsync();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<List<GameDTO>>(result));
        }

        //GET: api/Game/GetGameReleaseDate/?director=Jaime
        [HttpGet("GetGameReleaseDate")]
        public async Task<ActionResult<IEnumerable<GameDTO>>> GetGameReleaseDate([FromQuery] DateTime date)
        {
            var result = await _context.Games.Where(g => g.ReleaseDate == date).ToListAsync();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<List<GameDTO>>(result));
        }

        //GET: api/Game/GetGameWithCharacters
        [HttpGet("GetGameWithCharacters")]
        public async Task<ActionResult<IEnumerable<GameDTO>>> GetGameWithCharacters([FromQuery] List<string> characters)
        {

            var result = await _context.Games.Include(g => g.Characters).Where(g => g.Characters.Any(c => characters.Contains(c.Name))).ToListAsync();

            return Ok(_mapper.Map<List<GameDTO>>(result));
        }

        //GET: api/Game/GetGameWithCharacters
        [HttpGet("GetLeastRentedGameByYears")]
        public async Task<ActionResult<IEnumerable<GameDTO>>> GetLeastRentedGameByYears([FromQuery] int initialAge, [FromQuery] int endAge)
        {
            if (endAge == 0)
            {
                return BadRequest();
            }

            var result = await _context.Rents.Join(_context.Customers, r => r.CustomerId, c => c.CustomerId, (r, c) => new
            {
                Age = EF.Functions.DateDiffYear(c.DateOfBirth, DateTime.Now),
                r.GameId
            }).Where(s => s.Age >= initialAge && s.Age <= endAge)
             .GroupBy(g => g.GameId)
             .Select(g => new
             {
                 Quantity = g.Count(),
                 GameId = g.Key
             }).OrderBy(s => s.Quantity).Select(s => s.GameId)
             .FirstOrDefaultAsync();
            
            if (result == 0)
            {
                return NotFound();
            }

            var game = await _context.Games.FindAsync(result);

            return Ok(_mapper.Map<GameDTO>(game));
            
        }

        // PUT: api/Games/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGame(int id, GameDTO newGame)
        {
            var game = _mapper.Map<Game>(newGame);

            if (id != game.GameId)
            {
                return BadRequest();
            }

            _context.Entry(game).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameExists(id))
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

        // POST: api/Games
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GameDTO>> PostGame(GameDTO newGame)
        {
            var game = _mapper.Map<Game>(newGame);

            _context.Games.Add(game);
            await _context.SaveChangesAsync();
            newGame.GameId = game.GameId;
            return CreatedAtAction("GetGame", new { id = game.GameId }, newGame);
        }

        // DELETE: api/Games/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGame(int id)
        {
            var game = await _context.Games.FindAsync(id);
            if (game == null)
            {
                return NotFound();
            }

            _context.Games.Remove(game);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GameExists(int id)
        {
            return _context.Games.Any(e => e.GameId == id);
        }
    }
}
