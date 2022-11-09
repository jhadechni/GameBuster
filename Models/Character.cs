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

        [Column("image")]
        [StringLength(50)]
        [Unicode(false)]
        public string Image { get; set; } = "https://latarta.com.co/wp-content/uploads/2018/06/default-placeholder.png"!;

        [ForeignKey("CharacterId")]
        [InverseProperty("Characters")]
        public virtual ICollection<Game> Games { get; set; }
    }
}
