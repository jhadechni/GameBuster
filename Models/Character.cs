using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GameBuster.Models
{
    [Table("Character")]
    public partial class Character
    {
        public Character()
        {
            Games = new HashSet<Game>();
        }

        [Key]
        [Column("character_id")]
        public int CharacterId { get; set; }
        [Column("name")]
        [StringLength(50)]
        [Unicode(false)]
        public string Name { get; set; } = null!;

        [ForeignKey("CharacterId")]
        [InverseProperty("Characters")]
        public virtual ICollection<Game> Games { get; set; }
    }
}
