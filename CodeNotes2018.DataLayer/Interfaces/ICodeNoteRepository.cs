using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CodeNotes2018.DataLayer.Models;

namespace CodeNotes2018.DataLayer.Interfaces
{
    public interface ICodeNoteRepository
    {
        IEnumerable<CodeNotation> GetAll();
        IEnumerable<CodeNotation> GetAll(string statusCode);
        CodeNotation Get(int recordId);
        bool Add(CodeNotation item);
        bool Update(CodeNotation item);
        bool Delete(CodeNotation item);
        bool Delete(int recordId);
    }
}
