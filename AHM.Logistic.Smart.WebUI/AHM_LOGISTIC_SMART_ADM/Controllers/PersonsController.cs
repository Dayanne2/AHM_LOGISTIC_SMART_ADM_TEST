using AHM.Logistic.Smart.Common.Models;
using AHM_LOGISTIC_SMART_ADM.Models;
using AHM_LOGISTIC_SMART_ADM.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_LOGISTIC_SMART_ADM.Controllers
{
    public class PersonsController : Controller
    {
        private readonly CatalogService _catalogService;

        public PersonsController(CatalogService catalogService)
        {
            _catalogService = catalogService;
        }

        public async Task<IActionResult> Index()
        {
            var model = new List<PersonsViewModel>();
            var list = await _catalogService.PersonsList(model);

            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Detail(int Id)
        {
            var result = await _catalogService.PersonsDetails(Id);
            return Json(result);
        }

        #region Lists
        [HttpGet]
        public async Task<IActionResult> PersonsList()
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.PersonsViewModel>();
            var result = await _catalogService.PersonsList(model);
            return Json(result);
        }

        [HttpGet]
        public async Task<IActionResult> DepartList()
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.DepartmentsViewModel>();
            var result = await _catalogService.ApiDepartmentsList(model);
            return Json(result);
        }

        [HttpGet]
        public async Task<IActionResult> MunList(int id)
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.MunicipalitiesViewModel>();
            var result = await _catalogService.MunicipalitiesList(model);
            return Json(result);
        }
        #endregion

        [HttpGet]
        public IActionResult Create()
        {
            var model = new PersonsModel();
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create(PersonsModel model)
        {
            var result = await _catalogService.InsertPersons(model);
            return Json(result);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var response = await _catalogService.PersonsDetails(id);
            return View(response.Data);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(PersonsViewModel model)
        {
            var result = await _catalogService.EditPersons(model);
            return Json(result);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int Id, int Mod)
        {
            var result = await _catalogService.DeletePersons(Id, Mod);
            return Json(result);
        }
    }
}
