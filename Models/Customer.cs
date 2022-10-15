using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GameBuster.Models
{
    [Table("Customer")]
    public partial class Customer
    {
        public Customer()
        {
            Rents = new HashSet<Rent>();
        }

        [Key]
        [Column("customer_id")]
        public int CustomerId { get; set; }
        [Column("cedula")]
        [StringLength(50)]
        [Unicode(false)]
        public string Cedula { get; set; } = null!;
        [Column("name")]
        [StringLength(50)]
        [Unicode(false)]
        public string Name { get; set; } = null!;
        [Column("surname")]
        [StringLength(50)]
        [Unicode(false)]
        public string Surname { get; set; } = null!;
        [Column("date_of_birth", TypeName = "date")]
        public DateTime DateOfBirth { get; set; }
        [Column("address")]
        [StringLength(50)]
        [Unicode(false)]
        public string Address { get; set; } = null!;

        [InverseProperty("Customer")]
        public virtual ICollection<Rent> Rents { get; set; }
    }
}
