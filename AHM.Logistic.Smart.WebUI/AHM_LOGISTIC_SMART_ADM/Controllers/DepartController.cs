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
    public class DepartController : Controller
    {   

        private readonly CatalogService _trepService;

        public DepartController(CatalogService trepService)
        {
            _trepService = trepService;
        }

        public async Task<IActionResult> Index()
        {
            var model = new List<DepartmentsViewModel>();
            var listado = await _trepService.ApiDepartmentsList(model);

            return View(listado.Data);
        }

        [HttpGet]//listado
        public async Task<IActionResult> DepartList()
        {
            var model = new List<DepartmentsViewModel>();
            var result = await _trepService.ApiDepartmentsList(model);
            return Json(result);
        }

        [HttpGet]//insertar
        public IActionResult Create()
        {
            var model = new DepartmentsModel();
            return View(model);
        }

        [HttpPost]//crear
        public async Task<IActionResult> Create(DepartmentsModel model)
        {
            var resultado = await _trepService.InsertDepartments(model);
            return RedirectToAction("Index", "Depart");
        }


        [HttpGet]//actualizar
        public async Task<IActionResult> Edit(int id)
        {
            var response = await _trepService.DetailsDepartments(id);
            return Json(response);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(DepartmentsModel model, int id)
        {
            var result = await _trepService.EditDepartments(model, id);
            return RedirectToAction("Index", "Depart");
        }


        [HttpDelete]//delete
        public async Task<IActionResult> Delete(int Id, int Mod)
        {
            var result = await _trepService.DeleteDepartments(Id, Mod);
            return Json(result.Success);
        }

        //[HttpGet]
        //public async Task<IActionResult> ListDeparment()
        //{
        //    var model = new List<AHM.Logistic.Smart.Common.Models.DepartmentsViewModel>();
        //    var list = await _trepService.ListDeparment(model);

        //    return Json(list.Data);
        //}

    }
}
