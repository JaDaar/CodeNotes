using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CodeNotes2018.DataLayer.Interfaces;
using CodeNotes2018.DataLayer.Models;
using CodeNotes2018.DataLayer.Repository;

namespace CodeNotes2018.Controllers
{
    public class CodeNoteController : ApiController
    {
        CodeNotesModel ctx = new CodeNotesModel();
        ICodeNoteRepository iProp = new CodeNoteRepository();
        // GET: api/CodeNote
        [ActionName("get"), HttpGet]
        public IEnumerable<CodeNotation> Get()
        {
            return iProp.GetAll();
        }

        // GET: api/CodeNote/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/CodeNote
        [ActionName("post"), HttpPost]
        public void Post(CodeNotation product)
        {
            if (ModelState.IsValid)
            {
                iProp.Add(product);
            }
        }

        // PUT: api/CodeNote/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/CodeNote/5
        [ActionName("delete"), HttpDelete]
        public void Delete(int id)
        {
            if (ModelState.IsValid)
            {
                iProp.Delete(id);
            }
        }
    }
}
