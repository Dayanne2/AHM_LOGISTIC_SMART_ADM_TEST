using AHM.Logistic.Smart.Common.Models;
using AHM_LOGISTIC_SMART_ADM.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_LOGISTIC_SMART_ADM.Controllers
{
    public class AreasController : Controller
    {
        private readonly CatalogService _catalogService;

        public AreasController(CatalogService catalogService)
        {
            _catalogService = catalogService;
        }

        public async Task<IActionResult> Index()
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.AreasViewModel>();
            var list = await _catalogService.AreasList(model);
            if (list.Data == null) return RedirectToAction("Error", "Home");
            else return View(list.Data);

        }

        [HttpGet]
        public async Task<IActionResult> AreasList()
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.AreasViewModel>();
            var result = await _catalogService.AreasList(model);
            return Json(result);
        }

        [HttpGet]
        public IActionResult Create()
        {
            var model = new AreasModel();
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create(AreasModel model)
        {
            var resultado = await _catalogService.InsertAreas(model);
            return Json(resultado);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var response = await _catalogService.AreasDetails(id);
            return Json(response);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(AreasModel model, int id)
        {
            var result = await _catalogService.EditAreas(model, id);
            return Json(result);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int Id, int Mod)
        {
            var result = await _catalogService.DeleteAreas(Id, Mod);
            return Json(result);
        }
    }
}
