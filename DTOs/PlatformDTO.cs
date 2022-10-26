using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GameBuster.DTOs
{
    public class PlatformDTO
    {
        public int PlatformId { get; set; }
        public string Type { get; set; } = null!;
    }
}
