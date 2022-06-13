using AHM.Logistic.Smart.Common.Models;
using AHM_LOGISTIC_SMART_ADM.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_LOGISTIC_SMART_ADM.Controllers
{
    public class SubCategoriesController : Controller
    {
        private readonly SalesService _salesService;

        public SubCategoriesController(SalesService salesService)
        {
            _salesService = salesService;
        }
        public async Task<IActionResult> Index()
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.SubCategoriesViewModel>();
            var listado = await _salesService.SubCategoryList(model);

            return View(listado.Data);
        }

        [HttpGet]//listado ajax
        public async Task<IActionResult> SubCategoriesList()
        {
            var model = new List<SubCategoriesViewModel>();
            var result = await _salesService.SubCategoryList(model);
            return Json(result);
        }

        [HttpGet]//listado
        public async Task<IActionResult> SubCateList()
        {
            var model = new List<SubCategoriesViewModel>();
            var result = await _salesService.SubCategoryList(model);
            return Json(result);
        }

        [HttpGet]//crear
        public IActionResult Create()
        {
            var model = new SubCategoriesModel();
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create(SubCategoriesModel model)
        {
            var resultado = await _salesService.InsertSubCategories(model);
            return RedirectToAction("Index", "SubCategories");
        }

        [HttpGet]//actualizar
        public async Task<IActionResult> Edit(int id)
        {
            var response = await _salesService.DetailsSubCategory(id);
            return Json(response);
        }
        [HttpPut]
        public async Task<IActionResult> Edit(SubCategoriesModel model, int id)
        {
            var result = await _salesService.EditSubCategory(model, id);
            return RedirectToAction("Index", "SubCategories");
        }

        [HttpDelete]//delete
        public async Task<IActionResult> Delete(int Id, int Mod)
        {
            var result = await _salesService.DeleteSubCategory(Id, Mod);
            return Json(result.Success);
        }
    }
}
