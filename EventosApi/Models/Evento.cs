using System;
using System.ComponentModel.DataAnnotations;


namespace ApiEventos.Models
{
	public class Evento
	{
		[Key]
		public int EventoId { get; set; }

		[Required]
		[MaxLength(30)]
		public string NomeResponsavel { get; set; }

		[Required]
		public DateTime DtInicio { get; set; }

		[Required]
		public DateTime DtFim { get; set; }

		[Required]
		[MaxLength(20)]
		public string NomeSala { get; set; }

	}
}
