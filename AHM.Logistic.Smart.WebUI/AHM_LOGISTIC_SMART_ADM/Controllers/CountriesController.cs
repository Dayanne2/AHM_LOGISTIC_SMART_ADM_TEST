using AHM.Logistic.Smart.Common.Models;
using AHM_LOGISTIC_SMART_ADM.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_LOGISTIC_SMART_ADM.Controllers
{
    public class CountriesController : Controller
    {
        private readonly CatalogService _catalogService;

        public CountriesController(CatalogService catalogService)
        {
            _catalogService = catalogService;
        }
        public async Task<IActionResult> Index()
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.CountryViewModel>();
            var list = await _catalogService.CountriesList(model);
            if (list.Data == null) return RedirectToAction("Error", "Home");
            else return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> CountriesList()
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.CountryViewModel>();
            var result = await _catalogService.CountriesList(model);
            return Json(result);
        }

        [HttpGet]
        public IActionResult Create()
        {
            var model = new CountryModel();
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CountryModel model)
        {
            var resultado = await _catalogService.InsertCountries(model);
            return Json(resultado);
        }


        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var response = await _catalogService.DetailsCountries(id);
            return Json(response);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(CountryModel model, int id)
        {
            var result = await _catalogService.EditCountries(model, id);
            return Json(result);
        }

        [HttpDelete]
        public async Task<JsonResult> Delete(int Id, int Mod)
        {
            var result = await _catalogService.DeleteCountries(Id, Mod);
            return Json(result);
        }
    }
}
