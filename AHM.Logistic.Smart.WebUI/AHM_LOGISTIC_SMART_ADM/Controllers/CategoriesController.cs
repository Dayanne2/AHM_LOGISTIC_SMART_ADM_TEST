using AHM_LOGISTIC_SMART_ADM.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AHM.Logistic.Smart.Common.Models;

namespace AHM_LOGISTIC_SMART_ADM.Controllers
{
    public class CategoriesController : Controller
    {
        private readonly SalesService _salesService;

        public CategoriesController(SalesService salesService)
        {
            _salesService = salesService;
        }

        public async Task<IActionResult> Index()
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.CategoryViewModel>();
            var listado = await _salesService.CategoriesList(model);

            return View(listado.Data);
        }

        [HttpGet]
        public async Task<IActionResult> CategoriesList()
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.CategoryViewModel>();
            var result = await _salesService.CategoriesList(model);
            return Json(result);
        }

        [HttpGet]
        public IActionResult Create()
        {
            var model = new CategoryModel();
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CategoryModel model)
        {
            var resultado = await _salesService.InsertCategories(model);
            return RedirectToAction("Index", "Categories");
        }


        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var response = await _salesService.CategoriesDetails(id);
            return Json(response);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(CategoryModel model, int id)
        {
            var result = await _salesService.CategoriesEdit(model, id);
            return RedirectToAction("Index", "Categories");
        }

        [HttpDelete]
        public async Task<JsonResult> Delete(int Id, int Mod)
        {
            var result = await _salesService.DeleteCategories(Id,Mod);
            return Json(result.Success);
        }
    }
}
