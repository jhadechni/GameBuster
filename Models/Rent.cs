using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GameBuster.Models
{
    [Table("Rent")]
    public partial class Rent
    {
        [Key]
        [Column("rent_id")]
        public int RentId { get; set; }
        [Column("start_date", TypeName = "date")]
        public DateTime StartDate { get; set; }
        [Column("return_date", TypeName = "date")]
        public DateTime ReturnDate { get; set; }
        [Column("price", TypeName = "numeric(10, 3)")]
        public decimal Price { get; set; }
        [Column("game_id")]
        public int GameId { get; set; }
        [Column("customer_id")]
        public int CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        [InverseProperty("Rents")]
        public virtual Customer Customer { get; set; } = null!;
        [ForeignKey("GameId")]
        [InverseProperty("Rents")]
        public virtual Game Game { get; set; } = null!;
    }
}
