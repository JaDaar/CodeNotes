using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CodeNotes2018.DataLayer.Interfaces;
using CodeNotes2018.DataLayer.Models;
using NLog;

namespace CodeNotes2018.DataLayer.Repository
{
    public class CodeNoteRepository : ICodeNoteRepository
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        CodeNotesModel ctx = new CodeNotesModel();
        #region ICodeNoteRepository Members

        public IEnumerable<CodeNotation> GetAll()
        {
            try
            {
                var res = ctx.CodeNotations.Where(x => x.StatusCode == "A").AsEnumerable();
                return res;
            }
            catch (Exception ex)
            {
                logger.Log(LogLevel.Error, ex.GetBaseException());
                return null;
            }
        }
        public IEnumerable<CodeNotation> GetAll(string statusCode)
        {
            try
            {
                if (statusCode == null) throw new ArgumentNullException("Status cannot be null");
                if (statusCode != "A" && statusCode != "I" && statusCode != "D") throw new ArgumentException("Invalid Status");
                return ctx.CodeNotations.Where(x => x.StatusCode == statusCode).AsEnumerable();
            }
            catch (Exception ex)
            {
                logger.Log(LogLevel.Error, ex.GetBaseException());
                return null;
            }
        }

        public CodeNotation Get(int recordId)
        {
            try
            {
                if (recordId < 0) throw new ArgumentException("Invalid Record");
                var res = ctx.CodeNotations.Find(recordId);
                if (res.StatusCode.Equals("A"))
                    return res;
                else
                    return null;
            }
            catch (Exception ex)
            {
                logger.Log(LogLevel.Error, ex.GetBaseException());
                return null;
            }
        }

        public bool Add(CodeNotation product)
        {
            try
            {
                if (product == null) throw new ArgumentNullException("Notation cannot be null");
                DateTime tempDate;
                var results = DateTime.TryParse(product.UpdateDate.ToShortDateString(), out tempDate);
                if (results)
                {
                    ctx.CodeNotations.Add(product);
                    ctx.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                logger.Log(LogLevel.Error, ex.GetBaseException());
                return false;
            }
        }

        public bool Update(CodeNotation product)
        {
            try
            {
                if (product == null) throw new ArgumentNullException("Notation cannot be null");
                var codeProduct = ctx.CodeNotations.Single(x => x.CodeNotationsId == product.CodeNotationsId);
                codeProduct.NotationName = product.NotationName;
                codeProduct.NotationDescription = product.NotationDescription;
                codeProduct.NotationURL = product.NotationURL;
                codeProduct.CodeSnippet = product.CodeSnippet;
                codeProduct.StatusCode = product.StatusCode;
                codeProduct.UpdateDate = DateTime.Parse(DateTime.Now.ToShortDateString());
                ctx.SaveChanges();
                return true;
            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
            }
            catch (Exception ex)
            {
                logger.Log(LogLevel.Error, ex.GetBaseException());
                return false;
            }
        }

        public bool Delete(CodeNotation product)
        {
            try
            {
                if (product == null) throw new ArgumentNullException("Notation cannot be null");
                var codeProduct =
                    ctx.CodeNotations.Where(x => x.StatusCode == "A")
                        .First(x => x.NotationName == product.NotationName);
                codeProduct.StatusCode = "D";
                codeProduct.UpdateDate = DateTime.Parse(DateTime.Now.ToShortDateString());
                ctx.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                logger.Log(LogLevel.Error, ex.GetBaseException());
                return false;
            }
        }

        public bool Delete(int recordId)
        {
            try
            {
                if (recordId < 0) throw new ArgumentException("Invalid Record");
                var codeProduct = ctx.CodeNotations.Find(recordId);
                codeProduct.StatusCode = "D";
                codeProduct.UpdateDate = DateTime.Parse(DateTime.Now.ToShortDateString());
                ctx.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                logger.Log(LogLevel.Error, ex.GetBaseException());
                return false;
            }
        }

        #endregion
    }
}
