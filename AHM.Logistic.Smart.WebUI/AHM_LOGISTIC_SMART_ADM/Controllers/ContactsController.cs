using AHM_LOGISTIC_SMART_ADM.Models;
using AHM_LOGISTIC_SMART_ADM.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AHM.Logistic.Smart.Common.Models;


namespace AHM_LOGISTIC_SMART_ADM.Controllers
{
    public class ContactsController : Controller
    {
        private readonly CustomersService _trepService;

        public ContactsController(CustomersService trepService)
        {
            _trepService = trepService;
        }

        public async Task<IActionResult> Index()
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.ContactsViewModel>();
            var listado = await _trepService.ApiContactsList(model);

            return View(listado.Data);
        }

        [HttpGet]
        public IActionResult Create()
        {
            var model = new ContactsModel();
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ContactsModel model)
        {
            var resultado = await _trepService.InsertContacts(model);
            return Json(resultado);
        }
        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var response = await _trepService.ContactsDetails(id);
            return View(response.Data);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(ContactsModel model, int id)
        {
            var result = await _trepService.EditContacts(model, id);
            return Json(result);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int Id, int Mod)
        {
            var result = await _trepService.DeleteContacts(Id, Mod);
            return Json(result.Success);
        }
    }
}
