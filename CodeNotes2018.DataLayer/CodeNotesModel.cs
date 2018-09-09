namespace CodeNotes2018.DataLayer
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class CodeNotesModel : DbContext
    {
        public CodeNotesModel()
            : base("name=CodeNotes2018Model")
        {
        }

        public virtual DbSet<CodeNotation> CodeNotations { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
