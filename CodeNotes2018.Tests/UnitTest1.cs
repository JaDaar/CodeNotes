using System;
using System.Linq;
using CodeNotes2018.DataLayer.Interfaces;
using CodeNotes2018.DataLayer.Models;
using CodeNotes2018.DataLayer.Repository;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CodeNotes2018.Tests
{
    [TestClass]
    public class CodeNotesEFTests
    {
        CodeNotesModel ctx;
        private ICodeNoteRepository iCode;

        [TestInitialize]
        public void TestSetup()
        {
            ctx = new CodeNotesModel();
            iCode = new CodeNoteRepository();
        }

        [TestMethod]
        public void GetAll()
        {
            var results = iCode.GetAll();
            Assert.IsTrue(results.Any());
        }
    }
}
