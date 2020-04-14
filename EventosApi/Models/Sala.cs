using System.ComponentModel.DataAnnotations;


namespace ApiEventos.Models
{
    public class Sala
    {
        [Key]
        public int SalaId { get; set; }

        [Required]
        [MaxLength(20)]
        public string NomeSala { get; set; }
    }
}