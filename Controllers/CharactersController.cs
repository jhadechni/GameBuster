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
    public class CharactersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public CharactersController(AppDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }


        /// <summary>
        /// Return all Characters
        /// </summary>
        /// <returns>All Characters</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/Characters
        /// </remarks>
        /// <response code="200">Returns all Characters</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<CharacterDTO>>> GetCharacters()
        {
            var results = await _context.Characters.ToListAsync();
            return Ok(_mapper.Map<List<CharacterDTO>>(results));
        }

        /// <summary>
        /// Return a Character by its id
        /// </summary>
        /// <param name="id">Id of the Character</param>
        /// <returns>a Character</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/Characters/5
        /// </remarks>
        /// <response code="200">Returns the Character</response>
        /// <response code="404">If the Character was not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CharacterDTO>> GetCharacter(int id)
        {
            var character = await _context.Characters.FindAsync(id);

            if (character == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<CharacterDTO>(character));
        }

        /// <summary>
        /// Update the given Character by its id
        /// </summary>
        /// <returns>a Character</returns>
        /// <remarks>
        /// <param name="id">Characters id</param>
        /// <param name="newCharacter">Character info</param>
        /// Sample request
        /// PUT: api/Characters/5
        /// </remarks>
        /// <response code="204"> Character uptaded sucefully </response>
        /// <response code="400">If any changes was sended </response>
        /// <response code="404">If the Character was not found</response>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutCharacter(int id, CharacterDTO newCharacter)
        {
            var character = _mapper.Map<Character>(newCharacter);

            if (id != character.CharacterId)
            {
                return BadRequest();
            }

            _context.Entry(character).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CharacterExists(id))
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
        /// Create the given Character
        /// </summary>
        /// <remarks>
        /// <param name="newCharacter">Character info</param>
        /// Sample request
        /// POST: api/Characters
        /// </remarks>
        /// <response code="200"> Character created </response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<CharacterDTO>> PostCharacter(CharacterDTO newCharacter)
        {
            var character = _mapper.Map<Character>(newCharacter);
            _context.Characters.Add(character);
            await _context.SaveChangesAsync();
            newCharacter.CharacterId = character.CharacterId;

            return CreatedAtAction("GetCharacter", new { id = character.CharacterId }, newCharacter);
        }

        /// <summary>
        /// Delete a Character by its id
        /// </summary>
        /// <remarks>
        /// <param name="id">Character id</param>
        /// Sample request
        /// DELETE: api/Characters/5
        /// </remarks>
        /// <response code="204"> Character deleted</response>
        /// <response code="404">If the Character was not found</response>

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteCharacter(int id)
        {
            var character = await _context.Characters.FindAsync(id);
            if (character == null)
            {
                return NotFound();
            }

            _context.Characters.Remove(character);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CharacterExists(int id)
        {
            return _context.Characters.Any(e => e.CharacterId == id);
        }

    }
}
