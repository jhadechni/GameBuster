using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GameBuster.Models
{
    [Table("Platform")]
    public partial class Platform
    {
        public Platform()
        {
            Games = new HashSet<Game>();
        }

        [Key]
        [Column("platform_id")]
        public int PlatformId { get; set; }
        [Column("type")]
        [StringLength(50)]
        [Unicode(false)]
        public string Type { get; set; } = null!;

        [ForeignKey("PlatformId")]
        [InverseProperty("Platforms")]
        public virtual ICollection<Game> Games { get; set; }
    }
}
