using AHM.Logistic.Smart.Common.Models;
using AHM_LOGISTIC_SMART_ADM.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_LOGISTIC_SMART_ADM.Controllers
{
    public class QuoteController : Controller
    {

        private readonly SalesService _salesService;

        public QuoteController(SalesService salesService)
        {
            _salesService = salesService;
        }

        public async Task<IActionResult> Index()
        {
            var model = new List<CotizationsViewModel>();
            var listado = await _salesService.CotizationsList(model);

            return View(listado.Data);
        }

        public async Task<IActionResult> CustomersList()
        {
            var model = new List<CotizationsViewModel>();
            var listado = await _salesService.CotizationsList(model);

            return Json(listado);
        }

        public async Task<IActionResult> DetailsList(int id)
        {
            var listado = await _salesService.CotizationsDetails(id);
            return Json(listado);
        }

        

        public async Task<IActionResult> ProductsList()
        {
            var model = new List<CotizationsViewModel>();
            var listado = await _salesService.CotizationsList(model);

            return Json(listado);
        }

        [HttpGet]
        public IActionResult Create()
        {
            var model = new CotizationsModel();
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CotizationsModel model)
        {
            var resultado = await _salesService.InsertCotizations(model);
            return RedirectToAction("Index", "Quote");
        }

        [HttpGet]
        public IActionResult Edit()
        {
            var model = new CotizationsModel();
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(CotizationsModel model)
        {
            var result = await _salesService.EditCotizations(model);
            return RedirectToAction("Index", "Quote");
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int Id, int Mod)
        {
            var result = await _salesService.DeleteCotizations(Id, Mod);
            return Json(result.Success);
        }
    }
}
