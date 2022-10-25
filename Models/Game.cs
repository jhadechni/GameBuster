using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GameBuster.Models
{
    [Table("Game")]
    public partial class Game
    {
        public Game()
        {
            Rents = new HashSet<Rent>();
            Characters = new HashSet<Character>();
            Platforms = new HashSet<Platform>();
        }

        [Key]
        [Column("game_id")]
        public int GameId { get; set; }
        [Column("name")]
        [StringLength(50)]
        [Unicode(false)]
        public string Name { get; set; } = null!;
        [Column("release_date", TypeName = "date")]
        public DateTime ReleaseDate { get; set; }
        [Column("director")]
        [StringLength(50)]
        [Unicode(false)]
        public string Director { get; set; } = null!;
        [Column("producer")]
        [StringLength(50)]
        [Unicode(false)]
        public string Producer { get; set; } = null!;
        [Column("company")]
        [StringLength(50)]
        [Unicode(false)]
        public string Company { get; set; } = null!;
        [Column("price", TypeName = "numeric(10, 3)")]
        public decimal Price { get; set; }

        [InverseProperty("Game")]
        public virtual ICollection<Rent> Rents { get; set; }

        [ForeignKey("GameId")]
        [InverseProperty("Games")]
        public virtual ICollection<Character> Characters { get; set; }
        [ForeignKey("GameId")]
        [InverseProperty("Games")]
        public virtual ICollection<Platform> Platforms { get; set; }
    }
}
