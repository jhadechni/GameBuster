using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameBuster.DTOs
{
    public class RentDTO
    {
 
        public int RentId { get; set; }
  
        public DateTime StartDate { get; set; }
      
        public DateTime ReturnDate { get; set; }
  
        public decimal Price { get; set; }
 
        public int GameId { get; set; }

        public int CustomerId { get; set; }
    }
}
