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
    public class EmployersController : Controller
    {
        private readonly CatalogService _catalogService;

        public EmployersController(CatalogService catalogService)
        {
            _catalogService = catalogService;
        }
        public async Task<IActionResult> Index()
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.EmployeesViewModel>();
            var list= await _catalogService.EmployeesList(model);
            if (list.Data == null) return RedirectToAction("Error", "Home");
            else return View(list.Data);
        }

        public async Task<IActionResult> EmployeesList()
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.EmployeesViewModel>();
            var result = await _catalogService.EmployeesList(model);
            return Json(result);
        }

        [HttpGet]
        public IActionResult Create()
        {
            var model = new EmployeesModel();
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create(EmployeesModel model)
        {
            var resultado = await _catalogService.InsertEmployees(model);
            return Json(resultado);
        }


        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var response = await _catalogService.DetailsEmployees(id);
            return Json(response);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(EmployeesModel model, int id)
        {
            var result = await _catalogService.EditEmployees(model, id);
            return Json(result);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int Id, int Mod)
        {
            var result = await _catalogService.DeleteEmployees(Id, Mod);
            return Json(result);
        }
    }
}
