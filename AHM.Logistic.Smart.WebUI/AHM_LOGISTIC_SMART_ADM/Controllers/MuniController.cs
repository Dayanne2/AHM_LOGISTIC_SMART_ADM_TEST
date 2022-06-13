using AHM_LOGISTIC_SMART_ADM.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AHM.Logistic.Smart.Common.Models;

namespace AHM_LOGISTIC_SMART_ADM.Controllers
{
    public class MuniController : Controller
    {
        private readonly CatalogService _catalogService;
        public MuniController(CatalogService catalogService)
        {
            _catalogService = catalogService;
        }

        public async Task<IActionResult> Index()
        {
            var model = new List<MunicipalitiesViewModel>();
            var listado = await _catalogService.MunicipalitiesList(model);

            return View(listado.Data);
        }

        [HttpGet]//listado ajax
        public async Task<IActionResult> MuniList()
        {
            var model = new List<MunicipalitiesViewModel>();
            var result = await _catalogService.MunicipalitiesList(model);
            return Json(result);
        }

        [HttpGet]
        public IActionResult Create()
        {
            var model = new MunicipalitiesModel();
            return View(model);
        }

        [HttpGet]
        public async Task<IActionResult> Detail(int Id)
        {
            var result = await _catalogService.MunicipalitiesDetails(Id);
            return Json(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(MunicipalitiesModel model)
        {
            var result = await _catalogService.MunicipalitiesInsert(model);
            return RedirectToAction("Index", "Muni");
        }

        [HttpPut]
        public async Task<IActionResult> Edit(int Id, MunicipalitiesModel model)
        {
            var result = await _catalogService.MunicipalitiesEdit(model, Id);
            return Json(result.Success);
        }


        [HttpDelete]
        public async Task<IActionResult> Delete(int Id, int Mod)
        {
            var result = await _catalogService.MunicipalitiesDelete(Id, Mod);
            return Json(result.Success);
        }
    }
}
