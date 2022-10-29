using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GameBuster.DTOs
{
    public class CharacterDTO
    {
        public int CharacterId { get; set; }
        public string Name { get; set; } = null!;
    }
}
