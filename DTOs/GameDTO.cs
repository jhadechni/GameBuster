using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.X509Certificates;

namespace GameBuster.DTOs
{
    public class GameDTO
    {
        public int GameId { get; set; }
       
        public string Name { get; set; } = null!;
      
        public DateTime ReleaseDate { get; set; }
      
        public string Director { get; set; } = null!;
      
        public string Producer { get; set; } = null!;
      
        public string Company { get; set; } = null!;
 
        public decimal Price { get; set; }

        public List<string> Platforms { get; set; } = new List<string>();
    }
}
