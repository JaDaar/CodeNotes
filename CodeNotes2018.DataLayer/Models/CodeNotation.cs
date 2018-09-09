namespace CodeNotes2018.DataLayer.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class CodeNotation
    {
        [Key]
        public int CodeNotationsId { get; set; }

        [StringLength(70)]
        public string NotationName { get; set; }

        [StringLength(500)]
        public string NotationDescription { get; set; }

        public string NotationURL { get; set; }

        public string CodeSnippet { get; set; }

        public DateTime UpdateDate { get; set; }

        [Required]
        [StringLength(1)]
        public string StatusCode { get; set; }
    }
}
